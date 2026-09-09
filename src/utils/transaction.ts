import { Transaction, TxInput, TxOutput } from '../services/chain';
import { hex, sha256Bytes, signMessage, utf8 } from './crypto';

export function unsignedJson(tx: Transaction): string {
  const inputs: TxInput[] = tx.inputs.map((input) => ({ prevTxid: input.prevTxid, vout: input.vout }));
  // Go's unsignedBytes uses an anonymous struct with exported field names.
  return JSON.stringify({ Version:tx.version, Inputs:inputs, Outputs:tx.outputs, Timestamp:tx.timestamp, Memo:tx.memo ?? '' });
}

export function transactionId(tx: Transaction): string {
  return hex(sha256Bytes(utf8(unsignedJson(tx))));
}

export function signTransaction(tx: Transaction, secretKey: Uint8Array, publicKey: Uint8Array): Transaction {
  const digest = sha256Bytes(utf8(unsignedJson(tx)));
  const signature = hex(signMessage(secretKey, digest));
  const pubkey = hex(publicKey);
  return { ...tx, inputs: tx.inputs.map((input) => ({ ...input, signature, pubkey })) };
}

export function buildTransfer(inputs: {txid:string; vout:number}[], outputs: TxOutput[], memo = ''): Transaction {
  return { version:1, inputs:inputs.map((i) => ({prevTxid:i.txid, vout:i.vout})), outputs, timestamp:Math.floor(Date.now()/1000), memo };
}
