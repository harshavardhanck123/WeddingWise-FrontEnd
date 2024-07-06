import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userServices from '../../services/userServices';
import '../../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get userId from route parameters
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) {
          throw new Error('Profile id is not defined');
        }
        const data = await userServices.getProfile(id);
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (!id) {
        throw new Error('Profile id is not defined');
      }
      await userServices.deleteProfile(id);
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error('Error deleting profile:', error);
    }
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/users/edit/${id}`);
    } else {
      setError('Profile id is not defined');
      console.error('Error editing profile: Profile id is not defined');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {profile ? (
            <div>
              <p><strong>Name:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              {/* Add more profile fields as needed */}
            </div>
          ) : (
            <p className="text-muted">No profile found.</p>
          )}
          <div className="mt-3">
            <button className="btn btn-danger me-2" onClick={handleDelete}>Delete Profile</button>
            <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
