# React + TypeScript + Vite + Preact/Signals + SimpStore

1. Install dependencies
`npm i`
2. Run the app
`npm run dev`

## Usage

### Creating a Store

Here's an example of creating a store using React Signals:

```typescript
import { defineStore } from '@dot357/simpstore'
import { useSignal } from '@preact/signals-react'

export const useSignalStore = defineStore('signalStore', () => {
    const count = useSignal(0)
    
    function increment() {
        count.value++
    }

    function decrement() {
        count.value--
    }

    function getCount() {
        return count.value
    }

    // Example of a more complex action
    function incrementWithSideEffect() {
        count.value++
        count.value = count.value + randomIntFromInterval(1, 10)
    }

    return {
        count,
        increment,
        getCount,
        decrement,
        incrementWithSideEffect
    }
})
```

### Using the Store

```typescript
import { useSignalStore } from './stores/signalStore'

function MyComponent() {
    const store = useSignalStore()

    return (
        <div>
            <p>Count: {store.count}</p>
            <button onClick={store.increment}>Increment</button>
            <button onClick={store.decrement}>Decrement</button>
        </div>
    )
}
```

## Why SimpStore?

- **Simplicity First**: No complex boilerplate or configuration needed
- **Framework Freedom**: Unlike Redux, SimpStore doesn't force you into a specific pattern
- **Cross-Page State**: Perfect for Shopify applications using Liquid, where maintaining state across pages can be challenging
- **Local Storage Support**: Built-in options for state persistence
- **Lightweight**: Minimal overhead for your application

## TypeScript Support

SimpStore is written in TypeScript and provides full type safety out of the box.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Inspiration

This project is inspired by [Pinia](https://pinia.vuejs.org/), the Vue Store that brings simplicity and ease of use to state management.

## Development

Built with:
- TypeScript
- Vite

## Roadmap

- [ ] Add more storage adapters
- [ ] Add middleware support
- [ ] Add devtools integration
- [ ] Add more documentation and examples

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.