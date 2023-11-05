import react, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'
import { UserAuthContextProvider } from './UserAuthContext'
import Login from './login'
import Register from './register'
import app from './firebase'
import Home from './home';

function App() {
  return (
    <div className='app'>
    <Router>
    <UserAuthContextProvider>
        <Routes>
        <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
          <Route path = '/' element = {<Login />} />
          <Route path = '/signup' element = {<Register />} />
        </Routes>
        </UserAuthContextProvider>
        </Router>
    </div>
  )
}

export default App