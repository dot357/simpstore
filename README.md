# SimpStore

A simple, framework-agnostic state management library inspired by Pinia.

## Installation

```bash
npm i @dot357/simpstore
```

## Usage

```typescript
import { defineStore } from '@dot357/simpstore'

// Define a store
const useCounterStore = defineStore('counter', () => {
  let count = 0
  
  function increment() {
    count++
  }

  return { count, increment }
}, {
  persist: true // optional: enables localStorage persistence
})

// Use the store
const counter = useCounterStore()
counter.increment()
console.log(counter.count)

// Reset store to initial state
counter.$reset()
```

## Features

- 🎯 Framework agnostic
- 📦 Lightweight
- 🔄 State persistence
- 💪 TypeScript support
- 🏭 Singleton stores
- 🔄 Reset capability

## API

### defineStore

Creates a new store with the given options.

```typescript
defineStore(id: string, setup: () => T, options?: { persist?: boolean }): () => Store
```

### Store Instance Methods

- `$reset()`: Reset the store to its initial state

## License

MIT