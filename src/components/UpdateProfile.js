import React, { useState } from 'react';

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const token = localStorage.getItem('token'); // Replace with your actual JWT token

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo
      })
    });

 
  };

  return (
    <div className="container mt-5">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
