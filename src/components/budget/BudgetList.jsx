import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Alert } from 'react-bootstrap';
import budgetServices from '../../services/budgetServices';
import '../../styles/BudgetList.css';

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
        // Update budgets state to remove the deleted budget
        setBudgets(budgets.filter(budget => budget._id !== id));
      } catch (error) {
        console.error('Error deleting budget:', error);
        setError('Failed to delete budget');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-5 ">
      {budgets.length === 0 ? (
        <Alert variant="info">No budgets found.</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>S.No</th>
                <th>Event Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {budgets.map((budget, index) => (
                <tr key={budget._id}>
                  <td>{index + 1}</td>
                  <td>{budget.title}</td>
                  <td>{budget.category}</td>
                  <td>{budget.amount}</td>
                  <td className="actions">
                    <Button className="btn-transparent" as={Link} to={`/budgets/${budget._id}`}>View</Button>
                    <Button className="btn-transparent" onClick={() => handleDeleteBudget(budget._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <Link to="/budgets/create" className="btn btn-primary fixed-bottom-right">Create New Budget</Link>
    </div>
  );
};

export default BudgetList;
