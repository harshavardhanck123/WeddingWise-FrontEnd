import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import vendorServices from '../../services/vendorServices';
import '../../styles/CreateVendor.css';

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
        email: contactEmail,
      };
      await vendorServices.createVendor(name, serviceType, contactDetails, priceRange);
      navigate('/vendors');
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  };

  return (
    <div className="create-vendor-body">
      <Container className="create-vendor-container">
        <h2 className="create-vendor-heading">Create New Vendor</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="create-vendor-form-group">
            <Form.Label className="create-vendor-form-label">Name</Form.Label>
            <Form.Control
              className="create-vendor-form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="serviceType" className="create-vendor-form-group">
            <Form.Label className="create-vendor-form-label">Service Type</Form.Label>
            <Form.Control
              className="create-vendor-form-control"
              type="text"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="contactPhone" className="create-vendor-form-group">
            <Form.Label className="create-vendor-form-label">Contact Phone</Form.Label>
            <Form.Control
              className="create-vendor-form-control"
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="contactEmail" className="create-vendor-form-group">
            <Form.Label className="create-vendor-form-label">Contact Email</Form.Label>
            <Form.Control
              className="create-vendor-form-control"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="priceRange" className="create-vendor-form-group">
            <Form.Label className="create-vendor-form-label">Price Range</Form.Label>
            <Form.Control
              className="create-vendor-form-control"
              type="text"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="create-vendor-button">
            Create Vendor
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateVendor;
