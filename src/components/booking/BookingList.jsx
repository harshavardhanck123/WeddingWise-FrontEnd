import React, { useState, useEffect } from 'react';
import bookingServices from '../../services/bookingServices';
import {jwtDecode} from 'jwt-decode';
import '../../styles/BookingList.css'
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem('role') === 'admin'; // Check if user is admin

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const fetchedBookings = await bookingServices.getAllBookings();

        // Decode the JWT token to get userId
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (isAdmin) {
          // Admin can see all bookings
          setBookings(fetchedBookings);
        } else {
          // Regular user sees only their bookings
          const filteredBookings = fetchedBookings.filter(booking => booking.userId === userId);
          setBookings(filteredBookings);
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings');
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAdmin]);
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Bookings</h2>
      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Budget</th>
                {/* Add other headers as needed */}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No bookings found.</td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.title}</td>
                    <td>{booking.description}</td>
                    <td>{booking.date}</td>
                    <td>{booking.location}</td>
                    <td>{booking.budget}</td>
                    {/* Render other data cells as needed */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {error && <p className="text-center text-danger">{error}</p>}
    </div>
  );
};;

export default BookingList;
