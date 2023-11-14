import React, { useState } from "react";
import './cards/final.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [action, setAction] = useState("Signup");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            setIsLoading(true);

            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log('User registered successfully');
                navigate('/login');
            } else {
                const data = await response.json();
                console.error('Registration failed: ', data.error);
                alert(`Registration failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container2">
            <div className="header2">
                <div className='text2'>{action}</div>
            </div>
            <div className="inputs2">
                <div className="input2">
                    <input
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input2">
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className='submit-container2'>
                <div className="submit">
                    <button type="button" onClick={handleSignup} disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
