import { useState, useEffect } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserAuth } from "./UserAuthContext";
import './login.css'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const auth = getAuth()
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const { logIn } = useUserAuth

    const handleSubmit = async (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate('/home')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-login">
                    <span className="login-text"><span>Welcome Back...</span></span>
                    <div className="login-frame2">
                        <div className="login-frame5">
                            {/* <div className="login-frame4"> */}
                                <div className="login-upper-section">
                                    <div className="login-logintext">
                                        <span className="login-text02">Login</span>
                                    </div>
                                    <form onSubmit={handleSubmit} className="login-credentials">
                                        <div className="login-password-rem">
                                            <label className="login-text06" htmlFor = 'email'>Email</label>
                                            <input className="login-username" value = {email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"></input>
                                        </div>
                                        <div className="login-password-rem">
                                                <label className="login-text08" htmlFor = 'password'>Password</label>
                                                <input className="login-password" value = {pass} onChange={(e) => setPass(e.target.value)}type="password" id="password" name="password"></input>
                                        </div>
                                        <button className="login-login1" type="submit">Login</button>
                                    </form>
                                </div>
                            {/* </div> */}
                            <div className="login-frame9">
                                <span className="login-text16">
                                    <button className = "link-btn"> Don't have an account? <Link to = "/signup">Register here</Link></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <img
                        src="/external/line31031-fuot7.svg"
                        alt="Line31031"
                        className="login-line3"
                    /> */}
                </div>
            </div>
        </div>          
    )
}