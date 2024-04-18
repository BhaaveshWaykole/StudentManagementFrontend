import React, { useState, useEffect } from 'react'
import ClassCard from '../../components/classcard/ClassCard.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';

export default function Home() {
  const navigate = useNavigate();

  const goToClassroom = (classId) => {
    //console.log(classId);
    navigate(`/classroom/${classId._id}`)
  };

  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      console.log(user)
      try {
        if (user) {
          let endpoint;

          if (user.userType === 'student') {
            endpoint = `/api/students/class/${user._id}`;
          } else if (user.userType === 'faculty') {
            endpoint = `/api/teachers/class/${user._id}`;
          }

          if (endpoint) {
            const response = await axios.get(endpoint);
            console.log(response.data)
            setClasses(response.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch classes', error);
      }

    };

    fetchClasses();
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-row flex-wrap">
        {classes.map((classItem) => (
          <div key={classItem._id} onClick={() => goToClassroom(classItem)} className="class-card">

            <ClassCard classInfo={{
              key: classItem._id,
              className: classItem.name,
              teachers: classItem.teachers,
              // students: classItem.students
            }} />

          </div>
        ))}
      </div>
    </div>
  );
}