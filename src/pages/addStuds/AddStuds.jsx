import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar.jsx';

function AddStuds() {
    const { user } = useAuth();
    const prnRef = useRef();
    const batchRef = useRef();
    const navigate = useNavigate()
    const classId = useParams();
    const handleSubmit = async () => {
        try {
            await axios.post(`/api/classroom/${classId}`, {
                prn: prnRef.current.value,
                teachers: user._id
            });
            // navigate('/home'); // Navigate to home page after successful submission
        } catch (err) {
            console.log(err);
            // Handle any errors here
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center h-screen flex-col text-center bg-gray-200'>
                <h1 className='font-bold text-3xl'>Add Student</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div>
                        <input
                            type="text"
                            id="prn"
                            name="name"
                            ref={prnRef}
                            className='border-black rounded-md border-2 p-1'
                            placeholder='Student PRN'
                            required
                        />
                    </div>
                    <button type="submit" className='bg-gray-500 rounded-md'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddStuds;
