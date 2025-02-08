import { useSignalStore } from "../stores/signalExampleStore"

export default function Count() {
    const store : ReturnType<typeof useSignalStore> = useSignalStore()

    function incrementWithSideEffect() {
        store.incrementWithSideEffect()
    }
    return (
      <div>
        <button onClick={() => incrementWithSideEffect()}>Increment with side effect</button>
        Count from another component: {store.count}
      </div>
    )
}