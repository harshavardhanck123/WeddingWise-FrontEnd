import { instance, protectedInstance } from "./instance";
const userServices = {
  register: async (username, email, password, role) => {
    try {
      const response = await protectedInstance.post('/users/register', {
        username,
        email,
        password,
        role
      });
      return response.data; // Assuming the server returns the newly created user object
    } catch (error) {
      throw new Error(error.response.data.error || 'Failed to register user');
    }
  },
  login: async (email, password, role) => {
    try {
      const response = await protectedInstance.post('/users/login', {
        email,
        password,
        role
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || 'Failed to login user');
    }
  },
  getProfile : async () => {
    try {
      const storedId = localStorage.getItem('userId');

      if (!storedId) {
        throw new Error('Profile id is not defined');
      }
      const response = await protectedInstance.get(`/users/profile/${storedId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get user profile');
    }
  },
  logout: async (email, password) => {
    return await protectedInstance.post('/users/logout');
  },
  getAllUsers: async () => {
    const response = await protectedInstance.get('/users/allUsers')
    return response.data
  },
  deleteProfile: async (id) => {
    const response = await protectedInstance.delete(`/users/delete/${id}`)
    return response.data
  },
  updateUser: async (id, userData) => {
    try {
      const response = await protectedInstance.put(`/users/edit/${id}`, userData);
      return response.data; // Return the updated user data
    } catch (error) {
      throw new Error(error.response.data.error || 'Failed to update user');
    }
  }

}
export default userServices;