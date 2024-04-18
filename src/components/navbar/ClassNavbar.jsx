import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
function ClassNavbar() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const AttendanceCardNav = () => {
    navigate(`/classroom/markattendance/${classId}`)
  }
  const studentList = () => {
    navigate(`/students/class/${classId}`)
  }
  const addStudents = () => {
    navigate(`/addStudent/${classId}`)
  }
  return (
    <div className="ml-5 flex flex-row gap-7 p-5">
      {user && user.userType === 'faculty' && (
        <h2 className="bg-gray-500 p-2 rounded-lg text-white" onClick={AttendanceCardNav}>
          Attendance
        </h2>
      )}
      <h2 className="bg-gray-500 p-2 rounded-lg text-white" onClick={studentList}>
        Students
      </h2>
      {user && user.userType === 'faculty' && (
        <h2 className="bg-gray-500 p-2 rounded-lg text-white" onClick={addStudents}>
          Add Students
        </h2>
      )}
    </div>
  )
}

export default ClassNavbar