import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState('');
  const { classId } = useParams();

  useEffect(() => {
    const fetchClassInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/classroom/${classId}`);
          setClassName(response.data.name);
        } catch (error) {
          console.error(error);
        }
      };
    const fetchStudents = async () => {
      try {
        console.log(classId);
        const response = await axios.get(`http://localhost:8000/api/students/studclass/${classId}/`);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClassInfo();
    fetchStudents();
  }, [classId]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 font-weight-bold" style={{ fontSize: '24px', borderBottom: '2px solid #333' }}>
        Students in {className}
      </h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">PRN</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
              <td>{student.username}</td>
              <td>{student.prn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
