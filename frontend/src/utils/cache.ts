import { encrypt, decrypt } from './encryption';
import { GenericObject } from 'shared/types';

export const saveToLocal = (
  key: string,
  data: GenericObject | string,
  isJson = true,
  isEncrypted = false,
): void => {
  let dataToSave: any = data;
  if (data && isJson) {
    dataToSave = JSON.stringify(data);
  }
  if (dataToSave && isEncrypted) {
    dataToSave = encrypt(dataToSave);
  }
  global.localStorage.setItem(key, dataToSave);
};

export const getFromLocal = (key: string, isJson = true, isEncrypted = false): any | null => {
  let savedData: any = global.localStorage.getItem(key);

  if (savedData && isEncrypted) {
    savedData = decrypt(savedData);
  }
  if (savedData && isJson) {
    savedData = JSON.parse(savedData);
  }
  return savedData;
};

export const removeFromLocal = (key: string): void => {
  global.localStorage.removeItem(key);
};
