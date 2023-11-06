import React from 'react'

const Project = (props) => {
  const { title } = props;
  return (
    <div className='flex h-full'>
        <h2 className='font-semibold text-4xl border-b-2 w-full'> { title } </h2>
    </div>
  )
}

export default Project