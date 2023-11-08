import { useState } from 'react'
import Task from './components/task'
import Project from './containers/Project'
import Menu from './containers/Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-200 h-screen flex items-center'>
      <Menu />
      <Project title="Devvy" />
    </div>
  )
}

export default App
