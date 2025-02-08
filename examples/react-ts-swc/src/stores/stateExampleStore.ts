// stateExampleStore.ts
import { defineStore } from '@dot357/simpstore'
import { useState, useEffect } from 'react'

// State management outside of store definition
const createState = (initialValue = 0) => {
    const state = { value: initialValue }
    const listeners = new Set()
    
    const subscribe = (listener) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
    }
    
    const notify = () => {
        listeners.forEach(listener => listener(state.value))
    }
    
    return {
        get: () => state.value,
        set: (newValue) => {
            state.value = newValue
            notify()
        },
        subscribe
    }
}

const countState = createState(0)

export const useStateStore = defineStore('stateStore', () => {
    const [count, setCount] = useState(countState.get())
    
    useEffect(() => {
        return countState.subscribe(setCount)
    }, [])

    function increment() {
        countState.set(countState.get() + 1)
    }

    function decrement() {
        countState.set(countState.get() - 1)
    }

    function getCount() {
        return countState.get()
    }

    return {
        count,
        increment,
        getCount,
        decrement
    }
})