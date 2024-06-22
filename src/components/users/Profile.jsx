import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';
import '../../styles/Profile.css'

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userServices.getProfile(id);
        setProfile(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    } else {
      setError('Profile id not found');
      setLoading(false);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await userServices.deleteProfile(id);
      console.log('Profile deleted successfully');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error('Error deleting profile:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {/* Add more profile fields as needed */}

          <button onClick={handleDelete}>Delete Profile</button>
          <button onClick={handleEdit}>Edit Profile</button>
          {/* Replace 'edit' with your actual edit route */}

        </div>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );
};

export default Profile;
