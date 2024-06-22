import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import budgetServices from '../../services/budgetServices';

const BudgetDetail = () => {
  const { id } = useParams();
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await budgetServices.getBudget(id);
      setBudget(response);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch budget details');
      setLoading(false);
    }
  };

  const handleUpdateBudget = async () => {
    try {
      await budgetServices.updateBudgets(id);
      alert('Budget updated successfully');
    } catch (error) {
      console.error('Error updating budget:', error);
      setError('Failed to update budget');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Budget Detail</h2>
      {budget ? (
        <Card>
          <Card.Body>
            <Card.Title>Event ID: {budget.eventId}</Card.Title>
            <Card.Text>
              <strong>Category:</strong> {budget.category}<br />
              <strong>Amount:</strong> {budget.amount}
            </Card.Text>
            <Button variant="info" onClick={handleUpdateBudget}>Update</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>No budget found with ID: {id}</p>
      )}
    </div>
  );
};

export default BudgetDetail;
