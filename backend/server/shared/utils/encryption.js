import AES from 'crypto-js/aes';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import encUTF8 from 'crypto-js/enc-utf8';
import encBase64 from 'crypto-js/enc-base64';
import lib from 'crypto-js/lib-typedarrays';
import ENV from '../../config/env';

const secret = ENV.ENCRYPTION_KEY;

export const encrypt = (data) => AES.encrypt(JSON.stringify(data), secret).toString();

export const decrypt = (data) => {
  const bytes = AES.decrypt(data, secret);
  const decryptedData = JSON.parse(bytes.toString(encUTF8));
  return Buffer.from(decryptedData);
};

export const generateSalt = () => {
  return lib.random(16).toString(encBase64);
};

export const generateHashUsingSalt = (plainText, salt) => {
  return HmacSHA256(plainText, salt).toString();
};
