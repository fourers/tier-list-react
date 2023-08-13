import { useState } from 'react'
import './App.css'
import TierList from './components/TierList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TierList />
    </>
  )
}

export default App
