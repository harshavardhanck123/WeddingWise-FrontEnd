import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventServices from '../../services/eventServices';

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
      const eventData = { name, date, description, location, budget }; // Corrected object keys
      const data = await eventServices.createEvent(eventData);
      console.log('Event created:', data);

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
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Budget</label>
          <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </div>
        <button type="submit">Create Event</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {success && <p>Event created successfully!</p>}
      </form>
    </div>
  );
};

export default CreateEvent;
  