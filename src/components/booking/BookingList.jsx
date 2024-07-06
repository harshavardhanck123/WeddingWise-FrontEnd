import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Alert, Container, Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode'; // Correct import statement for jwt-decode
import bookingServices from '../../services/bookingServices';
import '../../styles/BookingList.css';

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
          const filteredBookings = fetchedBookings.filter(booking => booking.userId && booking.userId._id === userId);
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

  const handleStatusChange = async (id, status) => {
    try {
      await bookingServices.updateBooking(id, { status });
      // Optionally, update state or re-fetch data
      fetchBookings(); // Assuming fetchBookings function fetches and updates state
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError('Failed to update booking status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingServices.deleteBooking(id);
        setBookings(bookings.filter(booking => booking._id !== id));
      } catch (error) {
        console.error('Error deleting booking:', error);
        setError('Failed to delete booking');
      }
    }
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading bookings...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Event</th>
                <th>Vendor</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Created At</th>
                <th>Actions</th>
                <th>Booking Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">No bookings found.</td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userId ? `${booking.userId.username} (${booking.userId.email})` : 'Unknown'}</td>
                    <td>{booking.eventId ? booking.eventId.title : 'Unknown'}</td>
                    <td>{booking.vendorId ? booking.vendorId.name : 'Unknown'}</td>
                    <td>{booking.status}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                    <td>
                      <DropdownButton id="dropdown-basic-button" title="Change Status" size="sm" className="me-2 mb-2">
                        <Dropdown.Item onClick={() => handleStatusChange(booking._id, 'pending')}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange(booking._id, 'confirmed')}>Confirmed</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange(booking._id, 'completed')}>Completed</Dropdown.Item>
                      </DropdownButton>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(booking._id)}>Delete</Button>
                    </td>
                    <td>
                      <Button as={Link} to={`/bookings/${booking._id}`} size="sm">Details</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
      {error && <p className="text-center text-danger">{error}</p>}
    </Container>
  );
};

export default BookingList;
