# Deal Confirmation Application with Billing System

This is a full-stack application built with React frontend and Node.js backend for managing deal confirmations and billing.

## Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (v4.0.0 or higher)

## Project Structure

```
project-root/
├── frontend/         # React frontend application
└── backend/          # Node.js backend application
```

## Installation and Setup

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Required backend dependencies:
- express: ^4.18.2
- mongoose: ^7.0.3
- cors: ^2.8.5
- dotenv: ^16.0.3
- bcryptjs: ^2.4.3
- jsonwebtoken: ^9.0.0

Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:
```bash
npm run dev  # For development with nodemon
# or
npm start    # For production
```

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Required frontend dependencies:
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.11.2
- @mui/material: ^5.13.1
- @mui/icons-material: ^5.11.16
- @emotion/react: ^11.11.0
- @emotion/styled: ^11.11.0
- html2canvas: ^1.4.1
- jspdf: ^3.0.1
- react-to-print: ^2.15.1

Start the frontend application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Default Credentials

The application comes with default admin credentials:
- Username: admin
- Password: admin

## Features

1. User Authentication
   - Login system with admin access
   - JWT-based authentication

2. Billing System
   - Create, edit, and view bills
   - PDF generation
   - WhatsApp sharing functionality
   - Comprehensive billing form with fields for:
     - Date
     - Order number
     - Customer details
     - Product information
     - Quantity and quality
     - Rate
     - Terms and conditions

3. Data Management
   - MongoDB database integration
   - CRUD operations for bills
   - Data persistence

## Troubleshooting

1. If MongoDB connection fails:
   - Ensure MongoDB is running on your machine
   - Check the MongoDB connection string in the `.env` file
   - Verify network connectivity

2. If npm install fails:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json
   - Run `npm install` again

3. Port conflicts:
   - Backend default port: 5000
   - Frontend default port: 3000
   - Modify in respective configuration files if needed

## Additional Notes

- The application uses Material-UI for the interface
- PDF generation is handled client-side
- WhatsApp integration requires proper configuration of sharing endpoints
- Ensure proper CORS settings in production environment
