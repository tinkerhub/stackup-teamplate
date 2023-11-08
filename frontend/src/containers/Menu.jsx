import React from 'react'
import { AiOutlineCalendar, AiOutlineProject } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

const Menu = () => {
  const menuItems = [
    {
      Icon: <AiOutlineProject className='group-hover:text-indigo-400 text-white' />,
      name: "Projects"
    },
    {
        Icon: <BsFillPersonFill className='group-hover:text-indigo-400 text-white' />,
        name: "Dashboard"
    },
  ]
  return (
    <div className='w-[4.15%] h-full bg-indigo-400 cursor-pointer pt-20'>
      {menuItems.map((item, index) => (
        <div className='p-3 group hover:bg-white flex items-center justify-center m-3 rounded-full'>
          {item.Icon}
        </div>
      ))}
    </div>
  )
}

export default Menu