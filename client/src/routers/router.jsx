import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/home';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Mobiles from '../pages/mobiles';

function Router () {
    return (
        <div>
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} /> 
        <Route path='/signin' element={<Signin/>} /> 
        <Route path='/signup' element={<Signup/>} /> 
        <Route path='/mobiles' element={<Mobiles/>} />
        </Routes>
    </div>
  )
}

export default Router