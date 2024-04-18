import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MarkAttendance = () => {
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState(null); // State variable to track errors
    const [successMessage, setSuccessMessage] = useState(null); // State variable for success message
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
                const response = await axios.get(`http://localhost:8000/api/students/studclass/${classId}/`);
                // Add 'present' property to each student object to track their attendance
                setStudents(response.data.map(student => ({ ...student, present: false })));
            } catch (error) {
                console.error(error);
            }
        };
        fetchClassInfo();
        fetchStudents();
    }, [classId]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleCheckboxChange = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].present = !updatedStudents[index].present;
        setStudents(updatedStudents);
    };

    const handleSubmit = async () => {
        try {
            const attendanceData = {
                cId: classId,
                date: selectedDate,
                studentPresent: students.filter(student => student.present).map(student => student._id)
            };
            await axios.post('http://localhost:8000/api/attendance/regAttendance/', attendanceData);
            console.log("Attendance submitted for date:", selectedDate);
            // Clear any existing errors and set success message
            setError(null);
            setSuccessMessage("Attendance submitted successfully.");
        } catch (error) {
            setSuccessMessage(null);
            if (error.response && error.response.status === 503) {
                setError("Attendance already exists for the date!"); // Set error state
            } else {
                console.error("Error submitting attendance:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Display success message */}
            <h2 className="text-center mb-4 font-weight-bold" style={{ fontSize: '24px', borderBottom: '2px solid #333' }}>
                Mark Attendance for {className}
            </h2>
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <label htmlFor="datePicker">Select Date:</label>
                    <input type="date" id="datePicker" className="form-control" value={selectedDate} onChange={handleDateChange} />
                </div>
            </div>
            <table className="table table-bordered mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">PRN</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Present</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                            <td>{student.prn}</td>
                            <td>{student.username}</td>
                            <td><input type="checkbox" checked={student.present} onChange={() => handleCheckboxChange(index)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default MarkAttendance;
