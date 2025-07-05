import * as CryptoJS from 'crypto-js';

export function encodeId(id: number | string): string {
  const raw = typeof id === 'number' ? id.toString() : id;
  return Buffer.from(raw, 'utf-8').toString('base64');
}

export function decodeId(encodedId: string): string {
  return Buffer.from(encodedId, 'base64').toString('utf-8');
}
