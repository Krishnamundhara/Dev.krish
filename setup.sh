#!/bin/bash

echo "Starting setup for Deal Confirmation Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed! Please install Node.js first."
    echo "Download it from: https://nodejs.org/"
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "MongoDB is not installed! Please install MongoDB first."
    echo "Download it from: https://www.mongodb.com/try/download/community"
    exit 1
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Create .env file
echo "Creating .env file..."
cat > .env << EOL
MONGODB_URI=mongodb://localhost:27017/dealconfirmation
JWT_SECRET=your-secret-key
PORT=5000
EOL

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Setup complete
echo -e "\nSetup completed successfully!"
echo -e "\nTo start the application:"
echo "1. Open a new terminal and run: cd backend && npm start"
echo "2. Open another terminal and run: cd frontend && npm start"
echo -e "\nThe application will be available at http://localhost:3000"
echo "Default credentials - Username: admin, Password: admin" 