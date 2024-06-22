import { protectedInstance } from "./instance";

const budgetServices = {
    createBudget: async (eventId, title, category, amount) => {
      try {
        const response = await protectedInstance.post('/budgets', {
          eventId, title, category, amount
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to create budget');
      }
    },
    getBudget: async (budgetId) => {
      try {
        const response = await protectedInstance.get(`/budgets/${budgetId}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch budget');
      }
    },
    getAllBudgets: async () => {
      try {
        const response = await protectedInstance.get('/budgets');
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch budgets');
      }
    },
    updateBudget: async (id, data) => {
      try {
        const response = await protectedInstance.put(`/budgets/${id}`, data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update budget');
      }
    },
    deleteBudget: async (id) => {
      try {
        const response = await protectedInstance.delete(`/budgets/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to delete budget');
      }
    },
    addExpense: async (budgetId, expense) => {
      try {
        const response = await protectedInstance.post(`/budgets/${budgetId}/expenses`, expense);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to add expense');
      }
    }
  };
  
  export default budgetServices;
  