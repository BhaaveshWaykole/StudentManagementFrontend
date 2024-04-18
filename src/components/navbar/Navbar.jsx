import React from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import UserIcon from "../../profileDefaults/UserIcon.jsx"

export default function Navbar() {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // console.log(PF)

  const { user, logout } = useAuth();
  console.log(user.photo)
  const navigate = useNavigate();
  // console.log(user)
  const handleLogout = () => {
    logout();
    // You may perform additional logout-related actions here, such as redirecting to the login page
    navigate('/')
  };

  const handleHome = () => {
    navigate('/home')
  };

  const createClassHandle = () => {
    // You may perform additional logout-related actions here, such as redirecting to the login page
    navigate('/createclassroom')
  };

  return (
    <div className='bg-gray-400 h-fit p-1 flex flex-row align-center justify-between'>

      <div className="name font-poppins-800 p-3 w-fit h-full text-2xl">
        <div onClick={handleHome}>
          <h1 className="font-bold cursor-pointer">LMS</h1>
        </div>
      </div>

      <div className="flex ">
        {/* Create class button :- only faculty can  */}
        {user && user.userType === 'faculty' && (
          <div className="items-center flex mx-5">
            <button
              className='bg-green-500 font-bold text-white p-1 rounded-rnd-6p'
              onClick={createClassHandle}>Create Class</button>
          </div>
        )}

        {/* display profile pic  */}
        <div className='profile flex flex-col mr-2 pt-2'>
          {/* <a href="/profile">
            <img
              src={`http://localhost:3000/${user.photo}`}
              alt="ProfilePic"
              className='rounded-full h-12 w-12' />
          </a> */}
          <a href="/profile">
            <UserIcon name={user.name ? user.name : user.username} />
          </a>

          {/* display username */}
          <div className='font-semibold'>
            {user.name ? user.name : user.username}
          </div>
        </div>

        <div className="items-center flex mx-5">
          <button
            className='bg-orange-500 font-bold text-white p-1 rounded-rnd-6p'
            onClick={handleLogout}>Logout</button>
        </div>

      </div>
    </div>
  );
}
