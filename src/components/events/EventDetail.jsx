import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eventServices from '../../services/eventServices';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await eventServices.getEvent(id);
        setEvent(eventData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {event ? (
        <div>
          <h2>{event.name}</h2>
          <p>Date: {event.date}</p>
          <p>Description: {event.description}</p>
          <p>Location: {event.location}</p>
          <p>Budget: {event.budget}</p>
        </div>
      ) : (
        <p>No event found.</p>
      )}
    </div>
  );
};

export default EventDetail;
