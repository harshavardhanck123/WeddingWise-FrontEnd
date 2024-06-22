import React, { useState, useEffect } from 'react';
import userServices from '../../services/userServices';
import '../../styles/AllUsers.css';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userServices.getAllUsers();
        setUsers(res); // Assuming res.data contains the users array
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/users/edit/${userId}`)
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    // Handle delete logic here
    console.log('Delete user:', userId);
  };

  if (loading) {
    return <div className="loading text-center">Loading...</div>;
  }

  if (error) {
    return <div className="error text-center">{error}</div>;
  }

 
  
  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card user-card">
            <div className="card-header bg-custom text-white">
              <h2 className="text-center mb-0">All Users</h2>
            </div>
            <div className="card-body user-list-container">
              {users.length > 0 ? (
                <ul className="list-group user-list">
                  {users.map(user => (
                    <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="user-info">
                        <span>{user.username}</span>
                        <span>({user.email})</span>
                      </div>
                      <div className="user-actions">
                        <button className="btn btn-custom me-2" onClick={() => handleEdit(user._id)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No users available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllUsers;
