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
        <div className='signin-sub-right-cont'>
      <p className="signup-text">Sign Up</p><br></br>
      <form onSubmit={handlesignupFormSubmit} class="signup-form">
        <label for="username" className='signup-label'>Email</label><br></br>
        <input type="email" required 
          id='username' onChange={(e)=>setUsername(e.target.value)} className="signup-input"/><br></br>
          <label for="password" className='signup-label'>Password</label><br></br>
        <input type="password" required id='set-password' onChange={(e)=>setPassword(e.target.value)}
          className="signup-input"/><br></br>
          <label for="password" className='signup-label'>Confirm Password</label><br></br>
        <input type="password" required id='confrm-password' onChange={(e)=>setPassword(e.target.value)}
          className="signup-input"/><br></br>
          <input id="signup-agree" value="Yes" type="checkbox"></input>
          <label for="signup-agree" className='signup-terms'>I agree with <a href="/termsofuse">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.</label>
        <input type="submit" value="Sign Up" className="signup-button"/><br></br>
        <label for="new2signup" className='new2signup-lab'>Already have an account? </label>
        <a href='/signin' className='signup-help2' id="new2signup"> Sign In</a><br></br>
      </form>
      </div>
      </div>
    </div>
    <Footer />
    </div>)}
export default Signup