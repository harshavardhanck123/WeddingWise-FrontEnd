import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/users/Profile';
import AllUsers from './components/users/AllUsers';
import CreateEvent from './components/events/CreateEvent';
import EventList from './components/events/EventList';
import EventDetail from './components/events/EventDetail';
import CreateVendor from './components/vendors/CreateVendor';
import VendorList from './components/vendors/VendorList';
import VendorDetail from './components/vendors/VendorDetail';
import CreateBudget from './components/budget/CreateBudget';
import BudgetList from './components/budget/BudgetList';
import BudgetDetail from './components/budget/BudgetDetail';
import CreateBooking from './components/booking/CreateBooking';
import BookingList from './components/booking/BookingList';
import BookingDetail from './components/booking/BookingDetail';
import PrivateRoute from './PrivateRoute';
import Footer from './Footer';
import EditProfile from './components/users/EditProfile';
import Header from './Header';
import MyVendors from './components/vendors/MyVendors';
const App = () => {
  const [cart,setCart]=useState([])
  return (
    <Router>
            <div id="root">
      <Header/>
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/users/edit/:id" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/allUsers" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
        <Route path="/events/:id" element={<PrivateRoute><EventDetail /></PrivateRoute>} />
        <Route path="/vendors"  element={<VendorList cart={cart} setCart={setCart} />} />
        <Route path="/vendors/create" element={<PrivateRoute><CreateVendor /></PrivateRoute>} />
        <Route path="/vendors/:id" element={<PrivateRoute><VendorDetail /></PrivateRoute>} />
        <Route path="/budgets" element={<BudgetList />} />
        <Route path="/budgets/create" element={<PrivateRoute><CreateBudget /></PrivateRoute>} />
        <Route path="/budgets/:id" element={<PrivateRoute><BudgetDetail /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><BookingList /></PrivateRoute>} />
        <Route path="/bookings/create" element={<PrivateRoute><CreateBooking /></PrivateRoute>} />
        <Route path="/bookings/:id" element={<PrivateRoute><BookingDetail /></PrivateRoute>} />
        <Route path="/myvendors" element={<PrivateRoute><MyVendors cart={cart} /></PrivateRoute>} />

      </Routes>
      </div>
      <Footer />
 
      </div>
    </Router>
  );
};

export default App;
