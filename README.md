# Full Stack Web Application

This is a full-stack web application with React frontend, Node.js/Express backend, and MongoDB database.

## Project Structure
- `frontend/` - React application
- `backend/` - Node.js/Express server

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Features
- Modern React frontend with responsive design
- RESTful API backend
- MongoDB database integration
- User authentication
- CRUD operations

## Technologies Used
- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## PowerShell Execution Policy
To fix PowerShell execution policies, run the following command as administrator:
```bash
Set-ExecutionPolicy RemoteSigned
```
Type 'Y' when prompted.