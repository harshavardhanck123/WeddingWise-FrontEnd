import React, { useState, useEffect } from 'react';
import bookingServices from '../../services/bookingServices';
import { useParams } from 'react-router-dom';
import '../../styles/BookingDetail.css'

const BookingDetail = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!booking) {
    return <div>No booking found.</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Title: {booking.title}</p>
      <p>Description: {booking.description}</p>
      <p>Date: {booking.date}</p>
      <p>Location: {booking.location}</p>
      <p>Budget: {booking.budget}</p>
      <p>Created By: {booking.createdBy}</p>
      <p>Created At: {booking.createdAt}</p>
      <p>Status: {booking.status}</p>
    </div>
  );
};

export default BookingDetail;
