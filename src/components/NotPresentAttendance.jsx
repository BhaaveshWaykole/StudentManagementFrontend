import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotPresentAttendance = () => {
  const [date, setDate] = useState('');
  const [classroom, setClassroom] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("Bhaavesh")
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get('/api/classroom/661135e85dcd40e5d00fa5ec');
        const studentsData = response.data.students;
        // Set the students state
        setStudents(studentsData);
        // Fetch details for each student
        const studentsDetails = await Promise.all(
          studentsData.map(async studentId => {
            try {
              const studentResponse = await axios.get(`/api/students/${studentId}`);
              return { id: studentId, username: studentResponse.data.username };
            } catch (error) {
              console.error(`Error fetching student with ID ${studentId}:`, error);
              return null; // or handle the error in some way
            }
          })
        );
        const updatedStudents = studentsData.map((student, index) => {
          return { ...student, ...studentsDetails[index] };
        });
        setStudents(updatedStudents)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    // Call the async function
    fetchStudentDetails();
  }, []);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents(prevSelected => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter(id => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSubmit = () => {
    // Submit selected students, date, and classroom to backend
    // students.map((student) => {
    //   axios.put(`/api/attendance/${student._id}`, {
    //     date,
    //     classroom,
    //     students: selectedStudents
    //   })
    //     .then(() => {
    //       setSubmitted(true);
    //     })
    //     .catch(error => {
    //       console.error('Error submitting attendance:', error);
    //     });
    // })
    console.log('handlesubmit')
  };

  return (
    <div>
      {!submitted ? (
        <form>
          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <label>Classroom:</label>
          <input type="text" value={classroom} onChange={e => setClassroom(e.target.value)} />
          {/* <h1>Name : </h1> */}
          {students.map(student => (
            <div key={student._id}>
              <input type="checkbox" onChange={() => handleCheckboxChange(student._id)} />
              {student.username}
            </div>
          ))}
          <button type="button" onClick={handleSubmit()}>Submit</button>
        </form>
      ) : (
        <div>
          <p>Attendance submitted successfully!</p>
          <button onClick={() => window.location.reload()}>Add New Attendance</button>
        </div>
      )}
    </div>
  );
};

export default NotPresentAttendance;