import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar.jsx';
function CreateClassroom() {
    const { user } = useAuth();
    const nameRef = useRef();
    const batchRef = useRef();
    const navigate = useNavigate()
    // useEffect(() => {
    //     const createRoom = async () => {
    //         try {
    //             await axios.post("/api/classroom/regClass", { name: nameRef.current.value, teachers: user._id, batch: batchRef.current.value });
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     createRoom();
    // }, [user._id, nameRef.current.value, batchRef.current.value]);

    const handleSubmit = async () => {
        try {
            await axios.post("/api/classroom/regClass", {
                name: nameRef.current.value,
                teachers: user._id,
                batch: batchRef.current.value
            });
            navigate('/home'); // Navigate to home page after successful submission
        } catch (err) {
            console.log(err);
            // Handle any errors here
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center h-screen flex-col text-center bg-gray-200'>
                <h1 className='font-bold text-3xl'>Create Classroom</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            ref={nameRef}
                            className='border-black rounded-md border-2 p-1'
                            placeholder='Classroom name'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="batch"
                            placeholder='batch'
                            name="batch"
                            ref={batchRef}
                            className='border-black rounded-md border-2 p-1'
                            required
                        />
                    </div>
                    <button type="submit" className='bg-gray-500 rounded-md'>Create Classroom</button>
                </form>
            </div>
        </div>
    );
}

export default CreateClassroom;
