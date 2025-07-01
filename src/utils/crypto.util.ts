import * as CryptoJS from 'crypto-js';

const SALT = 'athulisagoodboy';

export function encodeId(id: number | string): string {
  const raw = typeof id === 'number' ? id.toString() : id;
  return CryptoJS.AES.encrypt(raw, SALT).toString();
}

export function decodeId(encryptedId: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedId, SALT);
  return bytes.toString(CryptoJS.enc.Utf8);
}
