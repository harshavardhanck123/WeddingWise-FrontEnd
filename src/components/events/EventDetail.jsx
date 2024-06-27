import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eventServices from '../../services/eventServices';
import '../../styles/EventDetail.css'; // Import CSS file for custom styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faMoneyBillAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4">Error: {error}</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {event ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                <span className="ml-2">Date: {event.date}</span>
              </li>
              <li className="list-group-item">
                <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                <span className="ml-2">Description: {event.description}</span>
              </li>
              <li className="list-group-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                <span className="ml-2">Location: {event.location}</span>
              </li>
              <li className="list-group-item">
                <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
                <span className="ml-2">Budget: {event.budget}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>No event found.</p>
      )}
    </div>
  );
};

export default EventDetail;
