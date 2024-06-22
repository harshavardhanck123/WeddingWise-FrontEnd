import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookingServices from '../../services/bookingServices';
import eventServices from '../../services/eventServices';
import vendorServices from '../../services/vendorServices';
import '../../styles/CreateBooking.css'; // Import the CSS file

const CreateBooking = () => {
  const [events, setEvents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [eventId, setEventId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchVendors();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventServices.getEvents();
      setEvents(response || []); // Ensure response.data is an array or fallback to an empty array
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await vendorServices.getAllVendors();
      setVendors(response || []); // Ensure response.data is an array or fallback to an empty array
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create booking
      await bookingServices.createBooking(eventId, vendorId, bookingDate);
      setLoading(false);
      navigate('/bookings'); // Redirect to bookings page after successful creation
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to create booking');
    }
  };

  return (
    <div>
      <div className="create-booking-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <div>
            <label className="form-label">Select Event:</label>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} required className="form-select">
              <option value="">Select an event</option>
              {events && events.length > 0 && (
                events.map(event => (
                  <option key={event._id} value={event._id}>{event.title}</option>
                ))
              )}
            </select>
          </div>
          <div>
            <label className="form-label">Select Vendor:</label>
            <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} required className="form-select">
              <option value="">Select a vendor</option>
              {vendors && vendors.length > 0 && (
                vendors.map(vendor => (
                  <option key={vendor._id} value={vendor._id}>{vendor.name} - {vendor.serviceType}</option>
                ))
              )}
            </select>
          </div>
          <div>
            <label className="form-label">Booking Date:</label>
            <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required className="form-input" />
          </div>
          <button type="submit" disabled={loading} className="submit-button">Create Booking</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateBooking;
