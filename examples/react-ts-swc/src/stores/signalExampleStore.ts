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

    function incrementWithSideEffect() {
        count.value++
        count.value = count.value + randomIntFromInterval(1,10)
    }


    // utility
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function randomIntFromInterval(min : number, max : number) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
 
    return {
        count,
        increment,
        getCount,
        decrement,
        incrementWithSideEffect
        
    }
})