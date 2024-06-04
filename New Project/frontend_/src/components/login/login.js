import React, { useState } from 'react';
import './login.css';
import logo from './image/logo.png';
import userIcon from './image/user_icon.png'; // changed to lowercase for consistency
import passwordIcon from './image/password.png'; // changed to lowercase for consistency
import loginImg from './image/Login_image.png'; // changed to lowercase for consistency
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => { // modified to use async function for axios
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3001/login', { email, password }); // modified URL for login endpoint
            console.log(result);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error); // improved error handling
        }
    };

    return (
        <div className='login'>
            <div className='logo'>
                <img src={logo} alt='Logo' />
            </div>
            <div className='text'>
                <h1>Stock Management System</h1>
            </div>
            <div className='login-body'>
                <div className='login-form'>
                    <form onSubmit={submitHandler}>
                        <div className='header'>
                            <div className="text-login">
                                <h1>LogIn</h1>
                            </div>
                        </div>
                        <div className="inputs">
                            <div className="input">
                                <img src={userIcon} alt="User Icon" />
                                <input 
                                    type="text" 
                                    placeholder='User Name' 
                                    value={email} // modified to use value instead of onChange
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div className="input">
                                <img src={passwordIcon} alt="Password Icon" />
                                <input 
                                    type="password" 
                                    placeholder='Password' 
                                    value={password} // modified to use value instead of onChange
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="submit">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className='login-image'>
                    <img src={loginImg} alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default Login;
