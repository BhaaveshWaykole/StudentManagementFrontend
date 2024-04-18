import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AttendanceCard() {
    const [attendanceData, setAttendanceData] = useState([]);
    const { classId } = useParams();
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                // Replace '/api/attendance/{classId}' with your actual endpoint
                const response = await axios.get(`/api/attendance/${classId}`);
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Failed to fetch attendance data', error);
            }
        };
        fetchAttendanceData();
    }, []);

    return (
        <div>
            {attendanceData.map((attendance) => (
                <div key={attendance.date} className="flex flex-row bg-gray-500 my-10 mx-5 rounded-rnd-6p p-6">
                    <div>
                        <h4>{attendance.date}</h4>
                    </div>
                    <div className='ml-5 profile flex flex-row mr-2'>
                        <h3>Number of students present: {attendance.presentCount}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AttendanceCard;
