// studentData.js

const studentData = [
    {
      "_id": "660af282169c5fa33919fdad",
      "prn": "21070122188",
      "username": "Yash",
      "email": "yash@gmail.com",
      "password": "$2b$10$F4nIfPq8OLxk1S81jb90M.pvoPuG85icSZT3L1qN05w5.OirfeOOe",
      "classes": [
        {
          "classId": "CSCI101",
          "className": "Introduction to Computer Science",
          "teacher": "Dr. Smith",
          "schedule": "Mon/Wed/Fri 9:00-10:30 AM"
        },
        {
          "classId": "MATH202",
          "className": "Calculus II",
          "teacher": "Prof. Johnson",
          "schedule": "Tue/Thu 1:00-2:30 PM"
        }
      ],
      "attendance": [
        {
          "classId": "CSCI101",
          "date": "2024-04-10",
          "status": "Present"
        },
        {
          "classId": "CSCI101",
          "date": "2024-04-12",
          "status": "Absent"
        }
      ],
      "__v": 0
    }
    // Add more student objects as needed
  ];
  
  module.exports = studentData;
  