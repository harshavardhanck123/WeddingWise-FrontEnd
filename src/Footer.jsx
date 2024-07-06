import React from 'react';
import './styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-3">
            <div className="container text-center">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5>Contact Us</h5>
                            <form className="footer-form">
                                <div className="form-group">
                                    <label htmlFor="contact-name">Name</label>
                                    <input type="text" id="contact-name" name="contact-name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-email">Email</label>
                                    <input type="email" id="contact-email" name="contact-email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea id="contact-message" name="contact-message" rows="3" className="form-control"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </form>
                        </div>
                        <div className="col">
                            <h5>Feedback</h5>
                            <form className="footer-form">
                                <div className="form-group">
                                    <label htmlFor="feedback-name">Name</label>
                                    <input type="text" id="feedback-name" name="feedback-name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="feedback-email">Email</label>
                                    <input type="email" id="feedback-email" name="feedback-email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="feedback-message">Feedback</label>
                                    <textarea id="feedback-message" name="feedback-message" rows="3" className="form-control"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-address">
                    <p>WeddingWise</p>
                    <p>1234 Wedding Lane</p>
                    <p>City, State, 56789</p>
                    <p>Email: contact@weddingwise.com</p>
                </div>
                <p>&copy; 2024 WeddingWise. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
