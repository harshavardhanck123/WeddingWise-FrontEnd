import React, { useState, useEffect } from 'react';
import eventServices from '../../services/eventServices';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid, Container, Card, CardActions, CardContent, Typography } from '@mui/material';
import '../../styles/EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventServices.getEvents();
        setEvents(res);
      } catch (error) {
        setError('Error fetching events');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const searchResults = await eventServices.searchEvents(title, date, location);
      setEvents(searchResults);
      setTitle('');
      setDate('');
      setLocation('');
    } catch (error) {
      console.error('Error searching events:', error.message);
      setError('Error searching events');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className="event-list">
      <div className="search-form-inner">
        <form onSubmit={handleSearch} className="search-form">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Date"
                type="date"
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <div className="search-button-container">
              <Button type="submit" className="search-form-button">
                Search
              </Button>
            </div>

          </Grid>
        </form>
      </div>
      <Container>
        {isAdmin && (
          <Grid container justifyContent="flex-end" className="create-event-button-container">
            <Button component={Link} to="/events/create" >
              Create Event
            </Button>
          </Grid>
        )}
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <Grid container spacing={4}>
            {events.map((event) => (
              <Grid item key={event._id} xs={12} sm={6} md={4}>
                <Card className="event-card">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={`/events/${event._id}`} variant="outlined" size="small" className="learn-more-button">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default EventList;
