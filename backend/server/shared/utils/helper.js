import { encrypt, decrypt } from './encryption';

export const encryptData = (data) => {
  return encrypt(data);
};

export const decryptData = (data) => {
  return decrypt(data);
};
