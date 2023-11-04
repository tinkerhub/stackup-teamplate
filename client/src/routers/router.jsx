import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
// import Home from './pages/home';


function Router () {
    return (
        <div>
      <Routes>
        {/* <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} /> */}
        </Routes>
    </div>
  )
}

export default Router