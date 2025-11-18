import CryptoJS from "crypto-js";
const KEY = import.meta.env.VITE_SECRET_KEY;

export function encryptToken(token: string): string {
  const encryptedToken = CryptoJS.AES.encrypt(token, KEY);
  return encryptedToken.toString();
}

export function decrytoToken(token: string): string {
  const bytes = CryptoJS.AES.decrypt(token, KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
