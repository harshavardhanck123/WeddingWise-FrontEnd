import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; // Import useLocation hook to access location state

const MyVendors = () => {
  const location = useLocation(); // Use useLocation hook to access location object
  const { state } = location;

  return (
    <div className="my-vendors">
      <Container>
        <h2>My Vendors</h2>
        {state && state.cart && state.cart.length > 0 ? (
          <Row>
            {state.cart.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.serviceType} - {item.priceRange}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>Your vendors list is empty.</p>
        )}
      </Container>
    </div>
  );
};

export default MyVendors;
