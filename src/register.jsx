import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from "./UserAuthContext";
import './register.css'

export default function Register(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [err, setErr] = useState('')
    const { signUp } = useUserAuth()
    const navigate = useNavigate()
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("")
        try {
            await signUp(email, pass)
            navigate("/")
        } catch(err) {
            setErr(err.message)
        }
    }

    return (
        <div>

            <div className="signup-container">
                <div className="signup-signup">
                    <span className="signup-text"><span>Welcome Aboard!</span></span>
                <div className="signup-frame2">
                    <div className="signup-frame5">
                        <div className="signup-frame4">
                            <div className="signup-upper-section">
                                <div className="signup-logintext">
                                    <span className="signup-text02"><span>Signup</span></span>
                                    <span className="signup-text04">
                                        <span>Just some details to get you in...</span>
                                    </span>
                                </div>
                                <form className="signup-credentials" onSubmit={handleSubmit}>
                                    <div className="signup-password-rem">
                                        <label className="signup-text10" htmlFor = 'name'>User Name</label>
                                        <input className="signup-username" value = {name} onChange={(e) => setName(e.target.value)} id="name" name="name"></input>
                                   </div>
                                   <div className="signup-password-rem">
                                        <label className="signup-text08" htmlFor = 'email'>Email</label>
                                        <input className="signup-username1" value = {email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"></input>
                                    </div>
                                    <div className="signup-password-rem">
                                        <label className="signup-text10" htmlFor = 'password'>Password</label>
                                        <input className="signup-password" value = {pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password"></input> 
                                    </div>
                                   
                                        <button className="signup-login" type="submit"> Register </button>
                                </form>
                            </div>
                            
                        </div>
                        <div className="signup-frame9">
                            <span className="signup-text18">
                                <button className = "link-btn"> Already have an account? <Link to = "/">Login here</Link></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                
    )
}