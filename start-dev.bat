@echo off
echo ====================================
echo Starting Image Search Application
echo ====================================
echo.

echo Checking environment file...
if not exist server\.env (
    echo ERROR: server\.env file not found!
    echo Please run setup.bat first and configure your environment variables.
    pause
    exit /b 1
)

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd client && npm start"

echo.
echo ====================================
echo Both servers are starting...
echo ====================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows will open for each server.
echo Press Ctrl+C in those windows to stop the servers.
echo.

pause
