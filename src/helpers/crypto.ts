import CryptoJS from 'crypto-js';
import { ProductType } from '../interfaces/store';

export const encrypt = (payload: ProductType[]) =>
  CryptoJS.AES.encrypt(JSON.stringify(payload), 'secret').toString();

export const decrypt = (payload: string) => {
  const bytes = CryptoJS.AES.decrypt(payload, 'secret');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
