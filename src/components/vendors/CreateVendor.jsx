import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import vendorServices from '../../services/vendorServices';

const CreateVendor = () => {
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactDetails = {
        phone: contactPhone,
        email: contactEmail
      };
      await vendorServices.createVendor(name, serviceType, contactDetails, priceRange);
    navigate('/vendors');
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  };

  return (
<Container>
      <h2>Create New Vendor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="serviceType">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="contactPhone">
          <Form.Label>Contact Phone</Form.Label>
          <Form.Control
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="contactEmail">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="priceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Vendor
        </Button>
      </Form>
    </Container>
  );
};

export default CreateVendor;
