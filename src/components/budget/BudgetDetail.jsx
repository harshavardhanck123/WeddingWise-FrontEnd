import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import budgetServices from '../../services/budgetServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faListAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../styles/BudgetDetail.css'; // Import CSS file for custom styling

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
      await budgetServices.updateBudget(id);
      alert('Budget updated successfully');
      // Optionally, you can fetch the budget again to refresh the data
      fetchBudget();
    } catch (error) {
      console.error('Error updating budget:', error);
      setError('Failed to update budget');
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4">{error}</p>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card budget-card">
        <div className="card-body">
          {budget ? (
            <Table striped bordered hover className="budget-table">
              <tbody>
                <tr>
                  <td><FontAwesomeIcon icon={faListAlt} className="icon" /> Category:</td>
                  <td>{budget.category}</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faDollarSign} className="icon" /> Amount:</td>
                  <td>{budget.amount}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-center">
                    <Button variant="info" onClick={handleUpdateBudget}>
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Update Budget
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No budget found with ID: {id}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetDetail;
