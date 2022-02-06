import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';
import { ENCRYPTION_KEY } from 'configs/env';

export { default as AES } from 'crypto-js/aes';
export { default as encUTF8 } from 'crypto-js/enc-utf8';

const secret = ENCRYPTION_KEY;

export const encrypt = (data: any): string => AES.encrypt(data, secret).toString();

export const decrypt = (data: any): string => AES.decrypt(data, secret).toString(encUTF8);
