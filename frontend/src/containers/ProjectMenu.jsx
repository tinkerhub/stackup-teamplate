import React from 'react'
import { BsChevronRight } from 'react-icons/bs'

const ProjectMenu = () => {
  return (
    <div className=' px-3 h-full border-r-2 border-slate-300'>
        <div className='mt-5 px-2'>
          <p className='font-semibold'>Projects</p>
        </div>
        <div>
          <ul className='mt-2'>
            <li className='text-sm p-2 hover:bg-slate-100 border-b-2 border-slate-300 cursor-pointer flex justify-between'>
              <p>The Devvy Project</p>
              <div className='flex items-center'>
                <BsChevronRight />
              </div>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default ProjectMenu