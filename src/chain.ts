export const DEFAULT_RPC_URL =
  process.env.EXPO_PUBLIC_RAINX_RPC_URL || 'http://127.0.0.1:27778';

export const COIN = 100_000_000n;
export const DECIMALS = 8;

export type ChainStatus = {
  name: string;
  symbol: string;
  chainId: string;
  height: number;
  hash: string;
  work: number;
  mempool: number;
  time: string;
};

export type Utxo = {
  txid: string;
  vout: number;
  value: number;
  address: string;
};

export type BlockHeader = {
  version: number;
  chainId: string;
  height: number;
  prevHash: string;
  merkleRoot: string;
  timestamp: number;
  bits: number;
  nonce: number;
};

export type TxInput = { prevTxid: string; vout: number; signature?: string; pubkey?: string };
export type TxOutput = { value: number; address: string };
export type Transaction = { version: number; inputs: TxInput[]; outputs: TxOutput[]; timestamp: number; memo?: string };
export type Block = { header: BlockHeader; transactions: Transaction[] };

export async function rpc<T>(url: string, path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init?.headers || {}) },
    });
    const raw = await response.text();
    if (!response.ok) throw new Error(raw || `RainX node returned ${response.status}`);
    return raw ? JSON.parse(raw) as T : (undefined as T);
  } finally {
    clearTimeout(timeout);
  }
}

export const getStatus = (url: string) => rpc<ChainStatus>(url, '/api/status');
export const getBlocks = (url: string, limit = 20) => rpc<Block[]>(url, `/api/blocks?limit=${limit}`);
export const getBalance = (url: string, address: string) => rpc<{ address:string; balance:number }>(url, `/api/balance?address=${encodeURIComponent(address)}`);
export const getUtxos = (url: string, address: string) => rpc<Utxo[]>(url, `/api/utxos?address=${encodeURIComponent(address)}`);
export const getHistory = (url: string, address: string) => rpc<Transaction[]>(url, `/api/history?address=${encodeURIComponent(address)}`);
export const getTransaction = (url: string, id: string) => rpc<Transaction>(url, `/api/tx?id=${encodeURIComponent(id)}`);
export const submitTransaction = (url: string, tx: Transaction) => rpc<{accepted:boolean; txid:string; duplicate?:boolean}>(url, '/api/submit', { method:'POST', body:JSON.stringify(tx) });

export function formatRxcAtomic(value: number | bigint, maxDecimals = 8): string {
  const raw = BigInt(value);
  const whole = raw / COIN;
  let fraction = (raw % COIN).toString().padStart(DECIMALS, '0').slice(0, maxDecimals);
  fraction = fraction.replace(/0+$/, '');
  return fraction ? `${whole.toString()}.${fraction}` : whole.toString();
}

export function parseRxc(input: string): bigint {
  const value = input.trim().replace(/,/g, '');
  if (!/^(?:\d+)(?:\.\d{0,8})?$/.test(value)) throw new Error('Enter a valid RXC amount (up to 8 decimals).');
  const [whole, frac = ''] = value.split('.');
  const atomic = BigInt(whole) * COIN + BigInt((frac + '0'.repeat(DECIMALS)).slice(0, DECIMALS));
  if (atomic <= 0n) throw new Error('Amount must be greater than zero.');
  return atomic;
}
