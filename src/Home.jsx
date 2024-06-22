import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendarAlt, faUsers, faUtensils, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import eventServices from './services/eventServices';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await eventServices.searchEvents(searchQuery);
        setEvents(eventData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const eventData = await eventServices.searchEvents(searchQuery.title, searchQuery.date, searchQuery.location);
      setEvents(eventData);
      setLoading(false);
  
      // Navigate to the first event's details page after search
      if (eventData.length > 0) {
        navigate(`/events/${eventData[0]._id}`);
      } else {
        setError('No events found matching your search.');
      }
    } catch (error) {
      setError(error.message); // Set error message to state for display
      setLoading(false); // Ensure loading state is set to false on error
      console.error('Error fetching events:', error); // Log detailed error for debugging
    }
  };  

  if (loading) {
    return <div className="home-container">Loading...</div>;
  }

  if (error) {
    return <div className="home-container">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <div className="jumbotron text-center">
        
        <h1>Welcome to WeddingWise</h1>
        <p>Plan your wedding with ease!</p>
        <div className="col-md">
        <form onSubmit={handleSearchSubmit} className="search-form">
  <input
    type="text"
    className="form-control search-input"
    placeholder="Search events by title..."
    name="title"
    value={searchQuery.title}
    onChange={handleSearchChange}
  />
  <input
    type="text"
    className="form-control search-input"
    placeholder="Search events by location..."
    name="location"
    value={searchQuery.location}
    onChange={handleSearchChange}
  />
  <button className="btn btn-outline-secondary search-button" type="submit">
    <FontAwesomeIcon icon={faSearch} />
  </button>
</form>

          </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-3">
            <div className="feature-box">
              <FontAwesomeIcon icon={faHeart} size="3x" className="feature-icon" />
              <h3>Love</h3>
              <p>Celebrate your love story with a perfect wedding.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-box">
              <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="feature-icon" />
              <h3>Schedule</h3>
              <p>Plan and manage your wedding events effortlessly.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-box">
              <FontAwesomeIcon icon={faUsers} size="3x" className="feature-icon" />
              <h3>Guests</h3>
              <p>Organize your guest list and send invitations.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-box">
              <FontAwesomeIcon icon={faUtensils} size="3x" className="feature-icon" />
              <h3>Vendors</h3>
              <p>Find and manage the best vendors for your big day.</p>
            </div>
          </div>
        </div>
        </div>
        
          
          <div className="jumbotron text-center mt-5 mb-0">
            <h2 className="feature-icon">Why Choose Us?</h2>
            <div className="contactus">
            <p>
              We provide the best tools and resources to make your wedding planning process smooth and enjoyable. From
              managing your budget to coordinating with vendors, we have got you covered.
            </p>
            <p>Join us today and start planning the wedding of your dreams!</p>
            <Link to="/register" className="btn btn-outline-secondary" >Get Started</Link>
            </div>
          </div>
        
      
    </div>
  );
};

export default Home;
