import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const userTypeRef = useRef(null);
    const prnRef = useRef(null);
    const nameRef = useRef(null);
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/');
    }
    const handleSubmit = async () => {
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const userType = userTypeRef.current.value;
            const prn = prnRef.current.value;
            const username = nameRef.current.value;
            await axios.post(`/api/students/register`, { email, password, userType, prn, username })
            alert()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="h-screen flex">
            <div className="container rounded-rnd-6p">
                <div className="header">
                    <div className="text">Signup</div>
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
                        <img src="" alt="" />
                        <input type="Name"
                            placeholder="Email Id"
                            ref={nameRef}
                        />
                    </div>
                    <div className="input">
                        <img src="" alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </div>
                    <div className="input">
                        <img src="" alt="" />
                        <input
                            type="prn"
                            placeholder="Roll No"
                            ref={prnRef}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center mt-5 gap-3'>
                    <div className="forgot-password cursor-pointer" onClick={handleLogin}>
                        Log In
                    </div>
                    <button className="submit" onClick={handleSubmit}>Sign Up</button>
                    {/* <div className="submit-container">
        </div> */}
                </div>
            </div>
        </div>
    )
}

export default Signup