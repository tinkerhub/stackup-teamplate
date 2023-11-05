import React from 'react'

const Task = (props) => {
    const { id, project_id, title, deadline, priority, progress } = props;

    const color = priority == 1 ? "#F20F38" : (priority == 2 ? "#F1C31B" : "#9FDB43");
    console.log(priority, color);
  return (
    <div className={`p-5 border-l-4 border-[${color}] shadow-md w-64 bg-white rounded-lg`}>
        <p className='font-semibold mb-3 text-lg'>{title}</p>
        <p className='text-xs'>Due: {deadline}</p>
    </div>
  )
}

export default Task