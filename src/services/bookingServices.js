import { instance, protectedInstance } from "./instance";

const bookingServices = {
    createBooking: async (eventId, vendorId, bookingDate) => {
        try {
            const response = await protectedInstance.post('/bookings', {
                eventId, vendorId, bookingDate
            })
            return response.data
        }
        catch (error) {
            throw new Error(error.response.data.error || 'Failed to search events')
        }
    },
    getBooking: async (bookingId) => {
        try {
            const response = await protectedInstance.get(`/bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch booking');
        }
    },
    getAllBookings: async () => {
        try {
            const response = await protectedInstance.get('/bookings')
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.error || "Failed to Fetch Bookings")
        }
    },
    updateBooking: async (id, data) => {
        try {
          const response = await protectedInstance.put(`/bookings/${id}`, data);
          return response.data;
        } catch (error) {
          throw new Error(error.response?.data?.message || 'Failed to update booking');
        }
      },
    deleteBooking: async (id) => {
        try {
            const response = await protectedInstance.delete(`/bookings/${id}`)
            return response.data
        }
        catch (error) {
            throw new Error(error.response?.data?.error || "Failed to Delete")
        }
    }
}

export default bookingServices;