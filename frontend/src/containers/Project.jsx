import React from 'react'
import ProjectMenu from './ProjectMenu';

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
            <div className='bg-slate-700 h-full'>

            </div>
          </div>
      </div>
    </div>
  )
}

export default Project