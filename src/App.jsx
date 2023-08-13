import { useState } from 'react'
import './App.css'
import TierList from './components/TierList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <TierList />
    </>
  )
}

export default App
