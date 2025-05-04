@echo off
echo Starting setup for Deal Confirmation Application...

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed! Please install Node.js first.
    echo Download it from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MongoDB is installed
where mongod >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo MongoDB is not installed! Please install MongoDB first.
    echo Download it from: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)

echo Installing backend dependencies...
cd backend
call npm install

echo Creating .env file...
(
echo MONGODB_URI=mongodb://localhost:27017/dealconfirmation
echo JWT_SECRET=your-secret-key
echo PORT=5000
) > .env

echo Installing frontend dependencies...
cd ../frontend
call npm install

echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Open a new terminal and run: cd backend ^& npm start
echo 2. Open another terminal and run: cd frontend ^& npm start
echo.
echo The application will be available at http://localhost:3000
echo Default credentials - Username: admin, Password: admin
pause 