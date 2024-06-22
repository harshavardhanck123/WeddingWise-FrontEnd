import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import budgetServices from '../../services/budgetServices';

const CreateBudget = () => {
  const [eventId, setEventId] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await budgetServices.createBudget(eventId, category, amount);
      alert('Budget created successfully');
      setEventId('');
      setCategory('');
      setAmount('');
    } catch (error) {
      console.error('Error creating budget:', error);
      setError('Failed to create budget');
    }
  };

  return (
    <div>
      <h2>Create New Budget</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="eventId">
          <Form.Label>Event ID</Form.Label>
          <Form.Control type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Budget
        </Button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Form>
    </div>
  );
};

export default CreateBudget;
