import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AnnouncementCard({ announceInfo }) {
  const [announcementData, setAnnouncementData] = useState();
  const [teachers, setTeachers] = useState();
  // console.log(announceInfo)
  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await axios.get(`/api/teachers/${announceInfo.teacher}`);
        setAnnouncementData(response.data.name);
        // console.log(response.data.name)
      } catch (error) {
        console.error('Failed to fetch announcement data', error);
      }
    };
    fetchAnnouncementData();
  }, [announceInfo.id]);
  const dateTime = new Date(announceInfo.createdAt);
  const date = dateTime.toDateString(); // Get the date part
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


  return (
    <div>
      <div className="flex flex-row">
        <div className='profile flex flex-row mr-2'>
          {/* redirect to profile page */}
          <a href="">
            <img src="profilePic.jpeg" alt="ProfilePic" className='rounded-full border-black border-1 h-12 w-12' />
          </a>
        </div>
        <div>
          <h2>
            {announcementData}
          </h2>
          <h4 className='text-xs'>
            <div>
              {date}
            </div>
            <div>
              {formattedTime}
            </div>
            {/* timestamp of when posted */}
          </h4>
        </div>
      </div>
      <div className='announceContent mt-2 h-fit text-wrap p-3'>
        <div className='text-lg'>
          {announceInfo.title}
        </div>
        <p>
          {announceInfo.content}
        </p>
      </div>
    </div>
  )
}
