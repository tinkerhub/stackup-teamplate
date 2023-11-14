import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Login from './pages/login';
import Home from './home';
import Signup from './pages/Signup';
import HomeLog from './homelog';
import CreatePost from './myPost';
import PostPage from './pages/PostPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/> 
          <Route path = 'login' element={<Login/>}/>
          <Route path = 'create' element={<HomeLog/>}/>
          <Route path="signup" element={<Signup />} /> 
          <Route path='blog' element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
