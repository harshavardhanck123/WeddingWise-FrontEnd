# WeddingWise - Event Management App

## Project Overview
WeddingWise is a full-stack web application built to help users plan and manage their wedding events efficiently. It provides tools for managing budgets, booking vendors, creating and updating events, and more.

## Features
- **Authentication:** Secure login and registration using JWT authentication and bcrypt for password hashing.
- **User Profiles:** View and manage user profiles and permissions.
- **Event Management:** Create, update, and view wedding events with detailed descriptions and schedules.
- **Vendor Management:** Search, select, and manage vendors for various wedding services.
- **Budget Tracking:** Set and monitor wedding budgets with detailed expense tracking.
- **Responsive Design:** Utilizes Bootstrap for a responsive and user-friendly interface.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **State Management:** Redux / Context API
- **Form Handling:** Formik
- **Routing:** React Router
- **CSS Framework:** Bootstrap

## Getting Started
Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (for cloud database) or MongoDB installed locally

### Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
git clone <https://github.com/harshavardhanck123/WeddingWise-FrontEnd>
cd wedding-planner
```

# Install backend dependencies
```bash
cd backend
npm install
```
# Install frontend dependencies
```bash
cd ../frontend
npm install
```


### Configuration

#### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```plaintext
PORT=3001
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

```
### Frontend Configuration

Create a `.env` file in the `frontend` directory with the following variable:

```plaintext
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### Running the App

#### Start the backend server:



# Inside the backend directory
```bash
npm start
```
#### Start the frontend development server:



# Inside the frontend directory
```bash
npm start
```

3. Open your browser and visit http://localhost:3000 to view the app.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap - for the responsive CSS framework
- React.js - for the frontend library
- Node.js and Express.js - for the backend server framework
- MongoDB - for the NoSQL database






