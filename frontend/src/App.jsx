import { useState } from 'react'
import Task from './components/task'
import Project from './components/Project'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-200 h-screen'>
      <Project title="Devvy" />
    </div>
  )
}

export default App
