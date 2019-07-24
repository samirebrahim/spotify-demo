import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {
  constructor() {}
  /**
   * set localstorage key & valye pair
   * @param key
   * @param value
   */
  setLocalStorageItem(key, value) {
    if (this.isLocalStorageSupported()) {
      if (key === undefined) {
        throw new Error('key is not exists');
      } else if (value === undefined) {
        throw new Error('value is not exists');
      } else {
        if (typeof value === 'object') {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, String(value));
        }
      }
    } else {
      throw new Error('local storage is not supported');
    }
  }

  /**
   * get localstorage valye by key
   * @param key
   */
  getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * remove localstorage value by key
   * @param key
   */
  removeLocalStorageItem(key) {
    localStorage.removeItem(key);
  }

  /**
   * check if the browser support localStorage or not
   */
  isLocalStorageSupported() {
    const dummy = 'dummy';
    try {
      localStorage.setItem(dummy, dummy);
      localStorage.removeItem(dummy);
      return true;
    } catch (e) {
      return false;
    }
  }
}
