import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import './Login.css'
// import axios from 'axios';

export const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userTypeRef = useRef(null);
  const { login } = useAuth()
  // const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userType = userTypeRef.current.value;

    // Assuming you have a method to validate user input before sending the request
    if (!email || !password) {
      console.error('Please enter email and password');
      return;
    }
    try {
      // Call the login method with email, password, and user type
      await login(email, password, userType);
      navigate('/home')
      // Redirect or perform other actions after successful login
    } catch (error) {
      // console.error('Login failed:', error);
      // setError(true)
      alert('You are not Registered. Please Register, \nEnter Details again and click "Sign UP" to register')
    }
  };

  const handleSignup = async () => {
    navigate('/signup')
  }

  return (
    <div className="h-screen flex">
      <div className="container rounded-rnd-6p">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <select
          className="dropdown border-black border-2 mt-5 p-1 rounded-md"
          ref={userTypeRef}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <div className="inputs">
          <div className="input">
            <img src="" alt="" />
            <input type="email"
              placeholder="Email Id"
              ref={emailRef}
            />
          </div>
          <div className="input">
            <img src="password.png" alt="" />
            <input type="password" placeholder="Password" ref={passwordRef} />
          </div>
        </div>
        <div className='flex flex-col items-center mt-5 gap-3'>
          <div className="forgot-password cursor-pointer" onClick={handleSignup}>
            Sign Up
          </div>
          <button className="submit" onClick={handleLogin}>Login</button>
          {/* <div className="submit-container">
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default Login;
