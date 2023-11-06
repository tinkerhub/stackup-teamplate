import { useState } from 'react'
import Task from './components/task'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-200 h-screen'>
      <Task title="First task" deadline="21/01/2024" priority="1" />
    </div>
  )
}

export default App
