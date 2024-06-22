import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import budgetServices from '../../services/budgetServices';
import '../../styles/BudgetList.css'

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await budgetServices.getAllBudgets();
      setBudgets(response);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch budgets');
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await budgetServices.deleteBudgets(id);
        setBudgets(budgets.filter(budget => budget._id !== id));
      } catch (error) {
        console.error('Error deleting budget:', error);
        setError('Failed to delete budget');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Budget List</h2>
      <Link to="/budgets/crea" className="btn btn-primary mb-3">Create New Budget</Link>
      {budgets.length === 0 ? (
        <p>No budgets found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Event ID</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => (
              <tr key={budget._id}>
                <td>{index + 1}</td>
                <td>{budget.eventId}</td>
                <td>{budget.category}</td>
                <td>{budget.amount}</td>
                <td>
                  <Button variant="info" as={Link} to={`/budget/${budget._id}`}>View</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteBudget(budget._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BudgetList;
