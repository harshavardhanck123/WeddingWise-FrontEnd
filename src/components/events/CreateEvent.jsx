import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventServices from '../../services/eventServices';
import '../../styles/CreateEvent.css'; // Import CSS for custom styling

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const eventData = { name, date, description, location, budget };
      const data = await eventServices.createEvent(eventData);

      // Clear form fields
      setName('');
      setDate('');
      setDescription('');
      setLocation('');
      setBudget('');
      setSuccess(true);
      navigate(`/events/${data._id}`); // Redirect to event detail page after creation
    } catch (error) {
      setError('Error creating event');
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit">Create Event</button>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {success && <p className="success-message">Event created successfully!</p>}
      </form>
    </div>
  );
};

export default CreateEvent;
