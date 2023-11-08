import React from 'react'
import ProjectMenu from './ProjectMenu';
import TaskContainer from './taskContainer';

const Project = (props) => {
  const { title } = props;
  return (
    <div className='flex h-full w-full'>
      <div className="w-2/12">
        <ProjectMenu />
      </div>
      <div className='w-10/12'>
          <div className='w-9/12 border-r-2 border-slate-300 h-full'>
            <div className='p-5  border-b-2 border-slate-300'>
              <h1 className='font-semibold text-4xl'>{ title }</h1>
              <p className='text-slate-600 mt-2'>Created by abcd</p>
            </div>
            <div className='p-2 h-full flex bg-slate-200'>
              {/* <div className='p-3 w-1/3 h-full'>
                <p className='font-semibold border-b-2 border-slate-400'>TO DO</p>
                <button className='w-full my-2 bg-indigo-400 p-2 rounded-sm border-[1px] border-slate-200 hover:bg-indigo-500 text-white transition'>+ Add Task</button>
              </div>
              <div className='bg-orange-500 w-1/3 h-full'>

              </div>
              <div className='bg-orange-500 w-1/3 h-full'>

              </div> */}
              <TaskContainer section="TO DO" tasks />
              <TaskContainer section="IN PROGRESS" tasks />
              <TaskContainer section="COMPLETED" tasks />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Project