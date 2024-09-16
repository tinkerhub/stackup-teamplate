import React from 'react'
import Task from '../components/task'

const TaskContainer = ({ section }) => {
  return (
    <div className='p-3 h-full w-1/3 flex'>
        <div className='w-full'>
            <div className='font-medium flex justify-between p-1 pt-0 border-b-2'>
                <h5 className='text-lg'>{section}</h5>
                <p className='bg-indigo-500 text-white px-4 rounded-md'>2</p>
            </div>
            <div>
                <button className='w-full my-2 bg-indigo-400 p-2 rounded-sm border-[1px] border-slate-200 hover:bg-indigo-500 text-white transition'>+ Add Task</button>
            </div>
                {/* <ul className='mt-2 flex flex-col gap-2'>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            <Task data={task} />
                        </div>
                    ))}
                </ul> */}
                <Task title="Hello" priority="3" deadline="09/11/23" />
        </div>
    </div>
  )
}

export default TaskContainer