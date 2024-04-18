import React, { useState, useEffect } from 'react';

const UserIcon = ({ name }) => {
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#C70039', '#900C3F', '#581845', '#4A235A', '#154360', '#1A5276', '#0E6655', '#117A65', '#148F77'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const initials = getInitials(name);
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(getRandomColor());
  }, [name]);

  return (
    <div style={{ backgroundColor: color, borderRadius: '50%', width: 48, height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      {initials}
    </div>
  );
};

export default UserIcon;
