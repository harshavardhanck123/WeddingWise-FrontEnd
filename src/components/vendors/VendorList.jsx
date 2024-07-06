import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import vendorServices from '../../services/vendorServices';
import '../../styles/VendorList.css';

const VendorList = ({ cart, setCart }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Assuming role is stored in local storage
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await vendorServices.getAllVendors();
      setVendors(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setError('Failed to load vendors. Please try again later.');
      setLoading(false);
    }
  };

  const addToCart = (vendorId) => {
    const selectedVendor = vendors.find((vendor) => vendor._id === vendorId);
    if (selectedVendor) {
      setCart([...cart, selectedVendor]);
    }
  };

  const goToVendorDetails = (vendorId) => {
    navigate(`/vendors/${vendorId}`);
  };

  const renderVendorCards = (serviceType) => {
    return vendors
      .filter((vendor) => vendor.serviceType === serviceType)
      .map((vendor) => (
        <Col key={vendor._id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
          <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{vendor.name}</Card.Title>
              <Card.Text>{vendor.description}</Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={() => goToVendorDetails(vendor._id)}>Vendor Details</Button>
                {isAuthenticated && role !== 'admin' && (
                  <Button variant="primary" onClick={() => addToCart(vendor._id)}>Add to MyVendors</Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ));
  };

  const navigateToMyVendors = () => {
    navigate('/myvendors', { state: { cart } });
  };

  const navigateToCreateVendor = () => {
    navigate('/vendors/create');
  };

  const serviceTypes = [...new Set(vendors.map((vendor) => vendor.serviceType))];

  return (
    <div className="vendor-list-container py-4">
      <Container>
        {loading && <p>Loading vendors...</p>}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && serviceTypes.map((type, index) => (
          <div key={index} className="mb-4">
            <h4>{type}</h4>
            <Row>
              {renderVendorCards(type)}
            </Row>
          </div>
        ))}

        {/* Conditional button rendering based on user role */}
        <div className="mt-4 text-center">
          {isAuthenticated ? (
            role === 'admin' ? (
              <Button variant="secondary" onClick={navigateToCreateVendor}>Create Vendor</Button>
            ) : (
              <Button variant="secondary" onClick={navigateToMyVendors}>View My Vendors</Button>
            )
          ) : (
            <p>Please log in to manage your vendors.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VendorList;
