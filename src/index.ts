export { defineStore, getStores, clearStores } from './store';

export type {
  StoreDefinition,
  StoreInstance,
  StoreOptions,
  MapStoresReturn
} from './types/common';

export const VERSION = '0.1.0';

export const mapStores = <T extends Record<string, () => any>>(
  stores: T
): { [K in keyof T]: ReturnType<T[K]> } => {
  const mappedStores = {} as { [K in keyof T]: ReturnType<T[K]> };
  
  for (const key in stores) {
    mappedStores[key] = stores[key]();
  }
  
  return mappedStores;
};