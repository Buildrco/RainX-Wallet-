import nacl from 'tweetnacl';
import { sha256 } from '@noble/hashes/sha256';
import { base58Encode } from './base58';

export type KeyPair = { publicKey: Uint8Array; secretKey: Uint8Array };

export function randomKeyPair(): KeyPair {
  const kp = nacl.sign.keyPair();
  return { publicKey: kp.publicKey, secretKey: kp.secretKey };
}

export function keyPairFromSeed(seed: Uint8Array): KeyPair {
  if (seed.length !== 32) throw new Error('RainX seed must be 32 bytes.');
  const kp = nacl.sign.keyPair.fromSeed(seed);
  return { publicKey: kp.publicKey, secretKey: kp.secretKey };
}

export function bytesFromHex(input: string): Uint8Array {
  if (!/^[0-9a-f]+$/i.test(input) || input.length % 2) throw new Error('Invalid hex.');
  const out = new Uint8Array(input.length / 2);
  for (let i=0;i<out.length;i++) out[i] = parseInt(input.slice(i*2,i*2+2),16);
  return out;
}

export function hex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function sha256Bytes(bytes: Uint8Array): Uint8Array { return sha256(bytes); }
export function sha256Hex(bytes: Uint8Array): string { return hex(sha256(bytes)); }

export function utf8(text: string): Uint8Array { return new TextEncoder().encode(text); }

export function addressFromPublicKey(pub: Uint8Array): string {
  const digest = sha256(pub);
  const payload = new Uint8Array(21);
  payload[0] = 0x52;
  payload.set(digest.slice(0, 20), 1);
  const first = sha256(payload);
  const second = sha256(first);
  const full = new Uint8Array(25);
  full.set(payload, 0);
  full.set(second.slice(0, 4), 21);
  return base58Encode(full);
}

export function signMessage(secretKey: Uint8Array, message: Uint8Array): Uint8Array {
  return nacl.sign.detached(message, secretKey);
}
