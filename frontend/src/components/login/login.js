import React from 'react'
import './login.css'
import logo from './image/logo.png'
import UseIcon from './image/user_icon.png'
import Password from './image/password.png'
import LoginImg from './image/Login_image.png'

const login = () => {
    
  return (
    <>
    <div className='login'>
        <div className='logo'>
            <img src={logo} alt='' />
        </div>
        <div className='text'>
            <h1>Stock Management System</h1>

        </div>
        <div className='login-body'>
           <div className='login-form'>
          
            <div className='header'>
                <div className="text-login">
                    <h1>LogIn</h1>
                </div>
            
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={UseIcon} alt="" />
                    <input type="text" placeholder='User Name' />
                </div>
               
                <div className="input">
                    <img src={Password} alt=" " />
                    <input type="password" placeholder='Password' />
                </div>
            </div>
           
           
            <div className="submit">
                <button>Login</button>
                
            </div>
        
           </div>
           <div className='login-image'>
                <img src={LoginImg}/>
           </div>
        </div>
    </div>
    </>
  )
}

export default login