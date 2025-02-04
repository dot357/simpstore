// src/__tests__/store.test.ts
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store = new Map();
  return {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, value: string) => store.set(key, value),
    clear: () => store.clear(),
    removeItem: (key: string) => store.delete(key),
    length: store.size,
    key: (index: number) => Array.from(store.keys())[index],
  };
})();

// Set up global localStorage mock
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
});
import { defineStore, getStores, clearStores, resetStores } from '../store'

describe('SimpStore', () => {
  beforeEach(() => {
    // Clear all stores and localStorage before each test
    resetStores()
    localStorage.clear()
  })

  describe('defineStore', () => {
    it('creates a singleton store', () => {
      const useStore = defineStore('test', () => {

        let count = 0
        function increment(){
          count++
        }

        return {
          count,
          increment
        }
      })

      const store1 = useStore()
      const store2 = useStore()
      expect(store1).toBe(store2)
    })

    it('maintains state between calls', () => {
      const useStore = defineStore('counter', () => {
        let count = 0

        function getCount(){
          return count
        }
        function increment(){
          count++
        }

        return {
          getCount,
          increment
        }
      })

      const store = useStore()
      store.increment()
      expect(store.getCount()).toBe(1)

      const sameStore = useStore()
      expect(sameStore.getCount()).toBe(1)
    })

    it('properly resets store state', () => {

      const useStore = defineStore('counter', () => {
        let initialCount = 0;
    
        return {
          count: initialCount, // Make count part of the store's state
          increment() { this.count++; } // Use this.count to modify the state
        };
      });
    
      const store = useStore();
      store.increment();
      expect(store.count).toBe(1);
      store.$reset();
      expect(store.count).toBe(0); 
    })


  })

  describe('persistence', () => {
    it('saves state to localStorage when persist option is true', async () => {
      const useStore = defineStore('persisted', () => ({
        count: 0,
        increment: () => { count++ }
      }), { persist: true })

      const store = useStore()
      store.count = 5

      // Wait for debounce
      await new Promise(resolve => setTimeout(resolve, 350))

      const savedState = localStorage.getItem('simp-store:persisted')
      expect(savedState).toBeDefined()
      expect(JSON.parse(savedState!).count).toBe(5)
    })

    it('loads persisted state on store creation', () => {
      // Set up initial state in localStorage
      localStorage.setItem('simp-store:persisted', JSON.stringify({ count: 10 }))

      const useStore = defineStore('persisted', () => ({
        count: 0,
        increment: () => { count++ }
      }), { persist: true })

      const store = useStore()
      expect(store.count).toBe(10)
    })

    it('handles invalid localStorage data', () => {
      // Set invalid JSON in localStorage
      localStorage.setItem('simp-store:invalid', 'invalid json')

      const useStore = defineStore('invalid', () => ({
        count: 0
      }), { persist: true })

      // Should not throw and should use initial state
      const store = useStore()
      expect(store.count).toBe(0)
    })
  })

  describe('state reactivity', () => {
    it('properly tracks state changes', () => {
      const useStore = defineStore('reactive', () => {
        let count = 0
        return {
          count,
          increment: () => { count++ }
        }
      })

      const store = useStore()
      store.count = 5
      expect(store.count).toBe(5)
    })

    it('only persists non-function values', async () => {
      const useStore = defineStore('methods', () => ({
        count: 0,
        increment: () => { count++ }
      }), { persist: true })

      const store = useStore()
      store.count = 5

      // Wait for debounce
      await new Promise(resolve => setTimeout(resolve, 350))

      const savedState = localStorage.getItem('simp-store:methods')
      const parsed = JSON.parse(savedState!)
      expect(parsed.increment).toBeUndefined()
      expect(parsed.count).toBe(5)
    })
  })

  describe('utility functions', () => {
    it('getStores returns all created stores', () => {
      clearStores();  // Clear all stores before test
      const useStore1 = defineStore('store1', () => {
        let value = 1;
        return { get value() { return value; } };
      });
    
      const useStore2 = defineStore('store2', () => {
        let value = 2;
        return { get value() { return value; } };
      });


    
      useStore1();  // Initialize store1
      useStore2();  // Initialize store2
    
      const stores = getStores();
      expect(stores.size).toBe(2);  // Should pass now
    
      const storeNames = [...stores.keys()].sort();
      expect(storeNames).toEqual(['store1', 'store2']);  // Should pass now
    });

    it('resetStores resets all stores to initial state', () => {
      const useStore1 = defineStore('store1', () => ({ value: 0 }))
      const useStore2 = defineStore('store2', () => ({ value: 0 }))

      const store1 = useStore1()
      const store2 = useStore2()

      store1.value = 5
      store2.value = 10

      resetStores()

      expect(store1.value).toBe(0)
      expect(store2.value).toBe(0)
    })
  })

  describe('error handling', () => {
    it('handles errors in store setup function', () => {
      const errorStore = defineStore('error', () => {
        throw new Error('Setup error')
      })
      
      expect(() => {
        errorStore()
      }).toThrow('Setup error')
    })

    it('handles undefined/null values in state', () => {
      const useStore = defineStore('nullable', () => ({
        value: null,
        undefinedValue: undefined
      }))

      const store = useStore()
      expect(store.value).toBeNull()
      expect(store.undefinedValue).toBeUndefined()
    })
  })
})