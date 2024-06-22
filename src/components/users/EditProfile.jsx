

import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';
import '../../styles/EditProfile.css'

const EditProfile = () => {
  const { id } = useParams(); // Assuming id is passed as a parameter
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    // Add more fields as needed
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userServices.getProfile(id);
        setFormData({
          username: data.username,
          role: data.role,
          // Populate other form fields as needed
        });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.updateUser(id, formData);
      console.log('Profile updated successfully');
      navigate(`/users/profile/${id}`); // Redirect to updated profile
    } catch (error) {
      setError(error.message);
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Add more form fields as needed */}
        <button type="submit">Update Profile</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
