import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import vendorServices from '../../services/vendorServices';
import '../../styles/VendorList.css';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Assuming role is stored in local storage

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
          <div className="card text-center" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">{vendor.name}</h5>
              <p className="card-text">{vendor.description}</p>
              <div className="d-flex justify-content-between">
                {role === 'admin' ? (
                  <>
                  <Button variant="primary" onClick={() => goToVendorDetails(vendor._id)}>Vendor Details</Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" onClick={() => goToVendorDetails(vendor._id)}>Vendor Details</Button>
                    <Button variant="primary" onClick={() => addToCart(vendor._id)}>Add to MyVendors</Button>
                  </>
                )}
              </div>
            </div>
          </div>
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
        {/* Render cards for each service type */}
        {serviceTypes.map((type, index) => (
          <div key={index} className="mb-4">
            <Row>
              {renderVendorCards(type)}
            </Row>
          </div>
        ))}

        {/* Conditional button rendering based on user role */}
        <div className="mt-4 text-center">
          {role === 'admin' ? (
            <Button variant="secondary" onClick={navigateToCreateVendor}>Create Vendor</Button>
          ) : (
            <Button variant="secondary" onClick={navigateToMyVendors}>View My Vendors</Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default VendorList;
