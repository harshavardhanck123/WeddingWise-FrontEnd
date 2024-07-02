import { protectedInstance,instance } from "./instance";

const eventServices = {
    getEvents: async () => {
        try {
            const response = await instance.get('/events');
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to fetch events');
        }
    },
    createEvent: async (title, description, date, location, budget) => {
        try {
            const response = await protectedInstance.post('/events', {
                title, description, date, location, budget
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to create event');
        }
    },
    getEvent: async (id) => {
        try {
            const response = await protectedInstance.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to fetch event');
        }
    },
    updateEvent: async (id, userData) => {
        try {
            const response = await protectedInstance.put(`events/${id}`, userData);
            return response.data; // Return the updated user data
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to update user');
        }
    },
    deleteEvent: async (id) => {
        const response = await protectedInstance.delete(`/events/${id}`)
        return response.data
    },
    searchEvents: async (title, date, location) => {
        try {
            const params = new URLSearchParams();
            if (title) params.append('title', title);
            if (date) params.append('date', date);
            if (location) params.append('location', location);

            const response = await protectedInstance.get(`/events/search?${params.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to search events');
        }
    }
}

export default eventServices;
