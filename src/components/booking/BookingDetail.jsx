import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import bookingServices from '../../services/bookingServices';
import '../../styles/BookingDetail.css';

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await bookingServices.getBooking(id);
        setBooking(bookingData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  if (!booking) {
    return <div className="text-center mt-5">No booking found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="booking-details">
        <p><strong>Booking ID:</strong> {booking._id}</p>
        <p><strong>User:</strong> {booking.userId ? `${booking.userId.username} (${booking.userId.email})` : 'Unknown'}</p>
        <p><strong>Event:</strong> {booking.eventId ? booking.eventId.title : 'Unknown'}</p>
        <p><strong>Vendor:</strong> {booking.vendorId ? booking.vendorId.name : 'Unknown'}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
        {/* Add additional details as needed */}
      </div>
    </div>
  );
};

export default BookingDetail;
