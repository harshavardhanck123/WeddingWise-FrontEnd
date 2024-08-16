import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCalendarAlt,
  faUsers,
  faUtensils,
  faSearch,
  faQuoteLeft,
  faQuoteRight,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import eventServices from "./services/eventServices";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Testimonials.css";
import Spinner from "./Spinner"; 

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await eventServices.searchEvents(searchQuery);
        setEvents(eventData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const eventData = await eventServices.searchEvents(
        searchQuery.title,
        searchQuery.date,
        searchQuery.location
      );
      setEvents(eventData);
      setLoading(false);

      if (eventData.length > 0) {
        navigate(`/events/${eventData[0]._id}`);
      } else {
        setError("No events found matching your search.");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching events:", error);
    }
  };

  if (loading) {
    return <div className="home-container"><Spinner/></div>;
  }

  if (error) {
    return <div className="home-container">Error: {error}</div>;
  }

  // Testimonials data
  const testimonials = [
    {
      text: "WeddingWise made our wedding planning so much easier. We found the best vendors and managed everything effortlessly.",
      name: "John Doe",
      image: "https://res.cloudinary.com/de0mhfxog/image/upload/v1720026865/weddingwise/gu9thtzgxifrsecoggft.jpg",
    },
    {
      text: "The scheduling feature is fantastic! We could coordinate all our events perfectly. Highly recommend WeddingWise.",
      name: "Jane Smith",
      image: "https://res.cloudinary.com/de0mhfxog/image/upload/v1720025603/weddingwise/oje2tamesq2clpetdywh.jpg",
    },
    {
      text: "Loved the guest management tool. Sending invites and tracking RSVPs was a breeze.",
      name: "Emily ",
      image: "https://res.cloudinary.com/de0mhfxog/image/upload/v1720025603/weddingwise/oje2tamesq2clpetdywh.jpg",
    },
  ];

  return (
    <div className="home-container">
      <div className="jumbotron text-center mt-0 welcome">
        <h1>Welcome to WeddingWise</h1>
        <h5>Plan your wedding with ease!</h5>
        <div className="col-md">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <select
              type="text"
              className="form-control search-input"
              placeholder="Search events by title..."
              name="title"
              value={searchQuery.title}
              onChange={handleSearchChange}
            > <option value="">Select Wedding Type</option>
            <option value="Traditional Weddings">Traditional Weddings</option>
            <option value="Modern Weddings">Modern Weddings</option>
            <option value="Vintage Weddings">Vintage Weddings</option>
            <option value="Beach Weddings">Beach Weddings</option>
          </select>
            
            <button className="btn-outline-secondary search-button" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-3">
            <Link to="/login" className="nav-link">
              <div className="feature-box">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="3x"
                  className="feature-icon"
                />
                <h3>Love</h3>
                <p>Celebrate your love story with a perfect wedding.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/login" className="nav-link">
              <div className="feature-box">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="3x"
                  className="feature-icon"
                />
                <h3>Schedule</h3>
                <p>Plan and manage your wedding events effortlessly.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/login" className="nav-link">
              <div className="feature-box">
                <FontAwesomeIcon
                  icon={faUsers}
                  size="3x"
                  className="feature-icon"
                />
                <h3>Guests</h3>
                <p>Organize your guest list and send invitations.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/login" className="nav-link">
              <div className="feature-box">
                <FontAwesomeIcon
                  icon={faUtensils}
                  size="3x"
                  className="feature-icon"
                />
                <h3>Vendors</h3>
                <p>Find and manage the best vendors for your big day.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="jumbotron text-center mt-5 mb-0">
        <h2 className="feature-icon">Why Choose Us?</h2>
        <div className="contactus">
          <p>
            We provide the best tools and resources to make your wedding planning process smooth and enjoyable. From managing your budget to coordinating with vendors, we have got you covered.
          </p>
          <p>Join us today and start planning the wedding of your dreams!</p>
          <Link to="/register" className="btn btn-outline-secondary">
            Get Started
          </Link>
        </div>
      </div>
      <div className="testimonial-container">
      <h2 className="text-center mb-4 heading" >What Our Users Say</h2>
      <Carousel indicators={false} pause={false} fade={false} touch={true} className="custom-carousel">
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index} className="testimonial-item">
            <div className="testimonial-content">
              <img
                className="testimonial-img rounded-circle"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div className="testimonial-text">
                <FontAwesomeIcon icon={faQuoteLeft} size="2x" className="quote-icon" />
                <p>{testimonial.text}</p>
                <FontAwesomeIcon icon={faQuoteRight} size="2x" className="quote-icon" />
                <h5>{testimonial.name}</h5>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    <div className="jumbotron text-center mb-0">
        <h2 className="feature-icon">About Us</h2>
        <div className="contactus">
          <p>
          India's favourite wedding planning website & app with over 1.5 millon monthly dedicated users. ​WedMeGood is​ a ​swanky alternative to the outdated wedding planning process. A one-stop-shop for all things weddings, you can find inspiratio​​n​, ​ideas ​and vendors within​ your​ budget​. WedMeGood has been trusted by over 2​​ m​illio​n brides & grooms​ all over the world​ to plan their big day.​ So sit back, log on to WedMeGood, and ​plan the wedding of your dreams​!

          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Home;
