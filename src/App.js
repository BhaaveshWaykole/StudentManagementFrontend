import './App.css';
import Home from './pages/home/Home.jsx';
import Classroom from './pages/classroom/Classroom.jsx';
import AttendanceCard from './components/attendanceCard/AttendanceCard.jsx'
import Login from './pages/login/Login.jsx'
import { AuthProvider } from './context/AuthContext.js';
import CreateClassroom from './pages/classroom/CreateClassroom.jsx';
import { Routes, Route } from 'react-router-dom';
import StudentList from './pages/studentList/StudentList.jsx';
import Profile from './pages/profile/Profile.jsx';
import Signup from './pages/signup/Signup.jsx';
import MarkAttendance from './pages/markAttendance/MarkAttendance.jsx';
import AddStuds from './pages/addStuds/AddStuds.jsx';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/createclassroom" element={<CreateClassroom />} />
          <Route path="/classroom/:classId" element={<Classroom />} />
          <Route path="/attendance" element={<AttendanceCard />} />
          <Route path='/students/class/:classId/' element={<StudentList/>}/>
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/classroom/markattendance/:classId' element={<MarkAttendance/>}/>
          <Route path='/addStudent/:id' element={<AddStuds/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;