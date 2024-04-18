import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/navbar/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
// import CreateClassroom from '../classroom/CreateClassroom'
// import UserIcon from "../../profileDefaults/UserIcon.jsx"
import axios from 'axios'

function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (user.userType === 'faculty') {
            await axios.delete(`/api/teachers/${user._id}`)
        } else {
            await axios.delete(`/api/students/${user._id}`)
        }
        logout()
        navigate('/')
    }
    const handleCreate = async () => {
        navigate('/createclassroom')
    }

    const handlelogout = async () => {
        logout()
        navigate('/')
    }
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='flex flex-col gap-5'>
                <div className='profile flex flex-col mr-2 pt-2 w-full mt-5'>
                    <a href="/profile" className="flex justify-center">
                        {/* <img src='profilePic.jpeg' alt="ProfilePic" className='rounded-full h-60 w-60' /> */}
                        {/* <img src={`http://localhost:3000/${user.photo}`} alt="ProfilePic" className='rounded-full h-60 w-60'  /> */}
                        <img src={process.env.PUBLIC_URL + user.photo} alt="ProfilePic" className='rounded-full h-60 w-60'  />
                        {/* <div className='rounded-full h-60 w-60'>
                            <UserIcon name={user.name ? user.name : user.username} />
                        </div> */}
                    </a>

                    <div className='font-semibold text-6xl text-center'>
                        {user.name ? user.name : user.username}
                    </div>
                </div>

                <div>
                    {/* user type */}
                    <h1 className="mt-2 capitalize text-4xl text-center">{user.userType}</h1>
                </div>

                {user && user.userType === 'faculty' && (
                    <div className='flex justify-center'>
                        <button onClick={handleCreate} className='bg-green-500 font-bold text-white p-3 rounded-rnd-6p'> Create Classroom </button>
                    </div>
                )}

                <div className='flex justify-center'>
                    <button onClick={handlelogout} className='bg-orange-500 font-bold text-white p-3 rounded-rnd-6p'> Logout </button>
                </div>

                <div className='flex justify-center'>
                    <button onClick={handleDelete} className='bg-red-500 font-bold text-white p-3 rounded-rnd-6p'> Delete Account </button>
                </div>

            </div>
        </div>
    )
}

export default Profile