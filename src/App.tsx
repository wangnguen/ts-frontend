import { useCounterStore } from './stores/counterStore'

function App() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">TS Uptime</h1>
        <p className="text-gray-500 text-sm">React + TypeScript + Zustand + Tailwind v4</p>

        <div className="text-6xl font-mono font-bold text-indigo-600">{count}</div>

        <div className="flex gap-3">
          <button
            onClick={decrement}
            className="px-5 py-2 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors"
          >
            -
          </button>
          <button
            onClick={reset}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="px-5 py-2 rounded-lg bg-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
