export type StoreDefinition<T> = () => T;
export type StoreInstance<T> = T & {
  $reset: () => void;
  $persist?: boolean;
};

export type StoreOptions = {
  persist?: boolean;
  debounceMs?: number;  // Optional debounce timing for persistence
};



// Additional utility types
export type MapStoresReturn<T extends Record<string, () => any>> = {
  [K in keyof T]: ReturnType<T[K]>;
};