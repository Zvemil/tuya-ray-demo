/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { store } from "@/redux";

const getDevKey =  (name: string) => {
  const { devId } =  store.getState().devInfo;
  return `${devId}_${name}`;
};

const getPidKey =  (name: string) => {
  const { productId } =  store.getState().devInfo;
  return `${productId}_${name}`;
};

const getUiKey =  (name: string) => {
  const { uiId } =  store.getState().devInfo;
  return `${uiId}_${name}`;
};

export default {
  async setItem(key: string, value: any) {
    const data = { value, type: typeof value };
    const jsonValue = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      ty.setStorage({
        key,
        data: jsonValue,
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        },
      });
    });
  },
  async setDevItem(name: string, value: any) {
    const key = await getDevKey(name);
    return this.setItem(key, value);
  },
  async setPidItem(name: string, value: any) {
    const key = getPidKey(name);
    return this.setItem(key, value);
  },
  async setUiItem(name: string, value: any) {
    const key = getUiKey(name);
    return this.setItem(key, value);
  },
  async getItem(key: string) {
    return new Promise((resolve, reject) => {
      ty.getStorage({
        key,
        success: ({ data }) => {
          if (data) {
            resolve(JSON.parse(data)?.value);
          }
          resolve(null);
        },
        fail: err => {
          reject(err);
        },
      });
    });
  },
  async getDevItem(name: string) {
    const key = await getDevKey(name);
    return this.getItem(key);
  },
  async getPidItem(name: string) {
    const key = getPidKey(name);
    return this.getItem(key);
  },
  async getUiItem(name: string) {
    const key = getUiKey(name);
    return this.getItem(key);
  },
  async removeItem(key: string) {
    return new Promise((resolve, reject) => {
      ty.removeStorage({
        key,
        success: () => {
          resolve(null);
        },
        fail: err => {
          reject(err);
        },
      });
    });
  },

  async removeDevItem(name: string) {
    const key = await getDevKey(name);
    return this.removeItem(key);
  },

  async removePidItem(name: string) {
    const key = await getDevKey(name);
    return this.removeItem(key);
  },
  async removeUiItem(name: string) {
    const key = getUiKey(name);
    return this.removeItem(key);
  },
};
