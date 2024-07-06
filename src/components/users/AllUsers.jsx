import React, { useState, useEffect } from 'react';
import userServices from '../../services/userServices';
import '../../styles/AllUsers.css';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userServices.getAllUsers();
        setUsers(res);
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
    navigate(`/users/edit/${userId}`);

  };

  const handleDelete = (userId) => {
    // Handle delete logic here

  };

  if (loading) {
    return <div className="loading text-center">Loading...</div>;
  }

  if (error) {
    return <div className="error text-center">{error}</div>;
  }

  return (
    <div className="all-users-container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card user-card">
            <div className="card-header bg-custom text-white">
              <h2 className="text-center mb-0">All Users</h2>
            </div>
            <div className="card-body user-list-container">
              {users.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-custom me-2"
                            onClick={() => handleEdit(user._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
