import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import '../styles/signin.css'
import Header from '../components/header';
import Footer from '../components/footer';
const Signin = () => {
        //const [signinAs, setsigninAs] = useState("admin")
        const [username,setUsername] = useState(null)
        const [password,setPassword] = useState(null)
        const navigate = useNavigate();

        const handlesigninFormSubmit = (event) => {     // Handle sign-in signic
          event.preventDefault()
          if(username==="matrizon@gmail.com" && password==="12345"){
            navigate("/home")
          }
          console.sign('Sign In Form Submitted')
          // console.sign('Sign In As:', signinAs)
        }

  return (
    <div className='signin-background'>
      <Header />
    <div class="signin-container">
        <div className='signin-left-container'>
        </div>
        <div className='signin-right-container'>
          <div className='signin-sub-right-cont'>
      <p className="signin-text">Sign In</p><br></br>
      <form onSubmit={handlesigninFormSubmit} class="signin-form">
        <label for="username" className='signin-label'>Email</label><br></br>
        <input type="email" required 
          id='username' onChange={(e)=>setUsername(e.target.value)} className="signin-input"/><br></br>
          <label for="password" className='signin-label'>Password</label><br></br>
        <input type="password" required id='password' onChange={(e)=>setPassword(e.target.value)}
          className="signin-input"/><br></br>
          <p className='signin-terms'>By continuing, you agree to Matrizon's <a href="/termsofuse">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.</p>
        <input type="submit" value="Sign In" className="signin-button"/><br></br>
        <a href='/sendmail' className='signin-help1' id="signin-forgot">Forgot Password?</a><br></br><br></br>
        <label for="new2signin" className='new2signin-lab'>New to Matrizon? </label>
        <a href='/signup' className='signin-help2' id="new2signin"> Sign Up</a><br></br>
      </form>
      </div>
      </div>
    </div>
    <Footer />
    </div>)}
export default Signin