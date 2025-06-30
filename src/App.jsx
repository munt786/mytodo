import { useState } from 'react'
import './App.css'
import MyTodo from './components/MyTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyTodo/>
    </>
  )
}

export default App
