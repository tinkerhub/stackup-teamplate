import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import '../styles/signup.css'
import Header from '../components/header';
import Footer from '../components/footer';
const Signup = () => {
        //const [signupAs, setsignupAs] = useState("admin")
        const [username,setUsername] = useState(null)
        const [password,setPassword] = useState(null)
        const navigate = useNavigate();

        const handlesignupFormSubmit = (event) => {     // Handle sign-in signic
          event.preventDefault()
          if(username==="matrizon@gmail.com" && password==="12345"){
            navigate("/home")
          }
          console.sign('Sign Up Form Submitted')
          // console.sign('Sign In As:', signupAs)
        }

  return (
    <div className='signup-background'>
      <Header />
    <div class="signup-container">
        <div className='signup-left-container'>
        </div>
        <div className='signup-right-container'>
      <p className="signup-text">Sign Up</p><br></br>
      <form onSubmit={handlesignupFormSubmit} class="signup-form">
        <label for="username" className='signup-label'>Email</label><br></br>
        <input type="email" required 
          id='username' onChange={(e)=>setUsername(e.target.value)} className="signup-input"/><br></br>
          <label for="password" className='signup-label'>Password</label><br></br>
        <input type="password" required id='password' onChange={(e)=>setPassword(e.target.value)}
          className="signup-input"/><br></br>
          <p className='signup-terms'>By continuing, you agree to Matrizon's <a href="/termsofuse">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.</p>
        <input type="submit" value="Sign Up" className="signup-button"/><br></br>
        <a href='/sendmail' className='signup-help1' id="signup-forgot">Forgot Password?</a><br></br><br></br>
        <label for="new2signup" className='new2signup-lab'>New to Matrizon? </label>
        <a href='/signup' className='signup-help2' id="new2signup"> Sign Up</a><br></br>
      </form>
      </div>
    </div>
    <Footer />
    </div>)}
export default Signup