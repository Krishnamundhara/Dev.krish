@echo off
echo Starting Deal Confirmation Application...

REM Start MongoDB (if not already running)
echo Ensuring MongoDB is running...
start /B mongod

REM Start backend server
echo Starting backend server...
cd backend
start /B cmd /c npm start

REM Wait for backend to start
timeout /t 5 /nobreak

REM Start frontend server
echo Starting frontend server...
cd ../frontend
start /B cmd /c npm start

echo.
echo Application is starting...
echo Frontend will be available at http://localhost:3000
echo Backend is running on http://localhost:5000
echo.
echo Default credentials:
echo Username: admin
echo Password: admin
echo.
echo Press any key to stop all servers...
pause

REM Kill all node processes
taskkill /F /IM node.exe /T
taskkill /F /IM mongod.exe /T 