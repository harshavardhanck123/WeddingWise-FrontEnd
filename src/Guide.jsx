// Guide.js

import React from 'react';
import { Link } from 'react-router-dom';


const Guide = () => {
  return (
    <section className="guide-section">
      <div className="container">
        <h2>Getting Started Guide</h2>
        <div className="guide-step">
          <h3>1. Register and Login</h3>
          <p>Create an account to start planning your wedding. If you already have an account, simply log in.</p>
          <Link to="/register" className="btn btn-primary">Register</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
        <div className="guide-step">
          <h3>2. Explore Features</h3>
          <p>Discover our features for planning events, managing budgets, and booking vendors.</p>
          <Link to="/features" className="btn btn-primary">Explore Features</Link>
        </div>
        <div className="guide-step">
          <h3>3. Search Events</h3>
          <p>Use the search bar above to find events based on title or location.</p>
        </div>
        <div className="guide-step">
          <h3>4. Why Choose Us?</h3>
          <p>Learn about our commitment to making your wedding planning process smooth and enjoyable.</p>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </section>
  );
};

export default Guide;
