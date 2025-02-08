import { useEffect } from 'react'
import './App.css'
import Count from './components/Count'
import { useSignalStore } from './stores/signalExampleStore'


function App() {
  const store = useSignalStore()

  return (
    <>
      <div>Count value: {store.count}</div>
      <button onClick={() => store.increment()}>Increment</button>
      <button onClick={() => store.decrement()}>Decrement</button>
      <Count />
    </>
  )
}

export default App