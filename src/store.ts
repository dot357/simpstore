import { StoreDefinition, StoreInstance } from "./types/common";

const stores = new Map<string, any>();


export function defineStore<T>(
    id: string,
    setup: StoreDefinition<T>,
    options: { persist?: boolean } = {}
  ): () => StoreInstance<T> {
    let instance: StoreInstance<T> | null = null;
  
    return () => {
      if (instance) {
        return instance;
      }
  
      // Initialize store
      const store = setup();
  
      // Add utility methods
      const storeInstance = {
        ...store,
        $reset: () => {
          const newStore = setup();
          Object.assign(storeInstance, newStore);
        },
      } as StoreInstance<T>;
  
      // Handle persistence if enabled
      if (options.persist) {
        storeInstance.$persist = true;
        
        // Load initial state from localStorage if exists
        const savedState = localStorage.getItem(`simp-store:${id}`);
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            Object.assign(storeInstance, parsed);
          } catch (e) {
            console.error(`Failed to parse stored state for store "${id}"`, e);
          }
        }
  
        // Setup persistence
        const saveState = () => {
          const state = Object.entries(storeInstance).reduce((acc, [key, value]) => {
            if (key.startsWith('$')) return acc;
            return { ...acc, [key]: value };
          }, {});
          
          localStorage.setItem(`simp-store:${id}`, JSON.stringify(state));
        };
  
        // Save state when it changes with debouncing
        const debounce = (fn: Function, ms = 300) => {
          let timeoutId: ReturnType<typeof setTimeout>;
          return function (...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(null, args), ms);
          };
        };
  
        const debouncedSaveState = debounce(saveState);
  
        // Track and proxy all non-function properties
        const stateKeys = Object.keys(store as any).filter(
          key => typeof (store as any)[key] !== 'function'
        );
  
        stateKeys.forEach(key => {
          let value = (storeInstance as any)[key];
          Object.defineProperty(storeInstance, key, {
            get: () => value,
            set: (newValue) => {
              value = newValue;
              debouncedSaveState();
            },
            enumerable: true,
            configurable: true
          });
        });
      }
  
      instance = storeInstance;
      stores.set(id, instance);
      
      return instance;
    };
  }
  
  // Function to access all stores (useful for dev tools)
  export function getStores(): Map<string, any> {
    return stores;
  }
  
  // Optional: Function to clear all stores
  export function resetStores(): void {
    stores.forEach((store) => {
      if (typeof store.$reset === 'function') {
        store.$reset();
      }
    });
  }


  export function clearStores(): void {
    stores.clear();  // Completely remove all stores from the map
  }
  