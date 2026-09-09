const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const INDEX = new Map([...ALPHABET].map((c, i) => [c, i]));

export function base58Encode(bytes: Uint8Array): string {
  let value = 0n;
  for (const b of bytes) value = value * 256n + BigInt(b);
  let out = '';
  while (value > 0n) { const r = Number(value % 58n); out = ALPHABET[r] + out; value /= 58n; }
  for (const b of bytes) { if (b !== 0) break; out = '1' + out; }
  return out;
}

export function base58Decode(value: string): Uint8Array {
  let n = 0n;
  for (const c of value) { const i = INDEX.get(c); if (i === undefined) throw new Error('Invalid Base58.'); n = n * 58n + BigInt(i); }
  const bytes: number[] = [];
  while (n > 0n) { bytes.unshift(Number(n & 255n)); n >>= 8n; }
  let zeros = 0; while (zeros < value.length && value[zeros] === '1') zeros++;
  return new Uint8Array([...new Array(zeros).fill(0), ...bytes]);
}
