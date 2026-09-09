import * as SecureStore from 'expo-secure-store';
import { generateMnemonic, mnemonicToEntropy } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { addressFromPublicKey, keyPairFromSeed, hex, bytesFromHex } from '../utils/crypto';

const KEY = 'rainx-wallet-v1';

type StoredWallet = { version:1; name:string; address:string; publicKey:string; secretKey:string; mnemonic?:string };

export async function hasWallet(): Promise<boolean> { return Boolean(await SecureStore.getItemAsync(KEY)); }
export async function loadWallet(): Promise<StoredWallet | null> { const raw=await SecureStore.getItemAsync(KEY); return raw ? JSON.parse(raw) as StoredWallet : null; }

export async function createWallet(name='Main wallet'): Promise<{ wallet:StoredWallet; mnemonic:string }> {
  const mnemonic = generateMnemonic(wordlist, 256);
  const entropy = mnemonicToEntropy(mnemonic, wordlist);
  const kp = keyPairFromSeed(entropy);
  const wallet:StoredWallet={version:1,name,address:addressFromPublicKey(kp.publicKey),publicKey:hex(kp.publicKey),secretKey:hex(kp.secretKey),mnemonic};
  await SecureStore.setItemAsync(KEY, JSON.stringify(wallet), { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
  return { wallet, mnemonic };
}

export async function importWallet(mnemonic:string, name='Main wallet'): Promise<StoredWallet> {
  const normalized = mnemonic.trim().toLowerCase().replace(/\s+/g,' ');
  const entropy = mnemonicToEntropy(normalized, wordlist);
  const kp = keyPairFromSeed(entropy);
  const wallet:StoredWallet={version:1,name,address:addressFromPublicKey(kp.publicKey),publicKey:hex(kp.publicKey),secretKey:hex(kp.secretKey),mnemonic:normalized};
  await SecureStore.setItemAsync(KEY, JSON.stringify(wallet), { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
  return wallet;
}

export async function clearWallet() { await SecureStore.deleteItemAsync(KEY); }
export function walletKeys(w:StoredWallet) { return { publicKey:bytesFromHex(w.publicKey), secretKey:bytesFromHex(w.secretKey) }; }
