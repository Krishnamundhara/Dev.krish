#!/bin/bash

echo "Starting Deal Confirmation Application..."

# Function to cleanup processes on exit
cleanup() {
    echo "Stopping all servers..."
    pkill -f "node"
    pkill -f "mongod"
    exit 0
}

# Set up trap to catch SIGINT (Ctrl+C)
trap cleanup SIGINT

# Start MongoDB (if not already running)
echo "Ensuring MongoDB is running..."
mongod &

# Start backend server
echo "Starting backend server..."
cd backend
npm start &

# Wait for backend to start
sleep 5

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm start &

echo -e "\nApplication is starting..."
echo "Frontend will be available at http://localhost:3000"
echo "Backend is running on http://localhost:5000"
echo -e "\nDefault credentials:"
echo "Username: admin"
echo "Password: admin"
echo -e "\nPress Ctrl+C to stop all servers..."

# Wait for user interrupt
wait 