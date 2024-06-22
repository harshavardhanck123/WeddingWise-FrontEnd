import { protectedInstance } from "./instance";

const vendorServices = {
    createVendor: async (name, serviceType, contactDetails, priceRange) => {
        try {
            const { phone, email } = contactDetails;
            const response = await protectedInstance.post('/vendors', {
                name, serviceType, contactDetails: { phone, email }, priceRange
            })
            return response.data
        }
        catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to create vendor');
        }
    },
    getVendor: async (id) => {
        try {
            const response = await protectedInstance.get(`/vendors/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch booking');
        }
    },
    getAllVendors: async () => {
        try {
            const response = await protectedInstance.get('/vendors')
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.error || "Failed to Fetch Bookings")
        }
    },
    updateVendor: async (id, userData) => {
        try {
            const response = await protectedInstance.put(`/vendors/${id}`, userData)
            return response.data
        }
        catch (error) {
            throw new Error(error.response?.data?.error || "Failed to Update")
        }
    },
    deleteVendor: async () => {
        const response = await protectedInstance.delete(`/vendors/${id}`)
        return response.data
    },
    searchVendors: async (serviceType, priceRange) => {
        try {
            const params = new URLSearchParams();
            if (serviceType) params.append('serviceType', serviceType);
            if (priceRange) params.append('priceRange', priceRange);

            const response = await protectedInstance.get(`/vendors/search?${params.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to search events');
        }
    }
}

export default vendorServices;