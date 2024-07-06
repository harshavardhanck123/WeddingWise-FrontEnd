import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTag } from '@fortawesome/free-solid-svg-icons';
import '../../styles/EditProfile.css'; // Import CSS file for custom styling

const EditProfile = () => {
  const { id } = useParams(); // Assuming id is passed as a parameter
  const navigate = useNavigate();
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
      navigate(`/users/profile/${id}`); // Redirect to updated profile
    } catch (error) {
      setError(error.message);
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container-fluid  ">
      <div className="row">
        <div className="col-md-6">
          <div className="card edit-profile-card">
            <div className="card-body">
            <h3 className="card-title">Edit Profile</h3>
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="username" className="form-label">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="role" className="form-label">
                    <FontAwesomeIcon icon={faUserTag} className="icon" />
                    Role:
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Update Profile</button>
                </div>
                {error && (
                  <div className="col-12">
                    <p className="error-message">Error: {error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
