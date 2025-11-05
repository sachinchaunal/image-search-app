@echo off
echo ====================================
echo Image Search ^& Multi-Select Setup
echo ====================================
echo.

echo [1/4] Installing Backend Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

echo [3/4] Setting up Environment File...
cd ..\server
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file from template
    echo.
    echo IMPORTANT: Please edit server\.env with your credentials!
    echo.
    echo You need to add:
    echo   - MongoDB URI
    echo   - OAuth credentials (Google/Facebook/GitHub)
    echo   - Unsplash API key
    echo   - Session secret
    echo.
) else (
    echo .env file already exists
)
echo.

echo [4/4] Checking MongoDB...
echo Please ensure MongoDB is running before starting the servers
echo.

echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next Steps:
echo 1. Edit server\.env with your API credentials
echo 2. Start MongoDB if not already running
echo 3. Run 'start-dev.bat' to start both servers
echo.
echo For detailed setup instructions, see:
echo   - README.md
echo   - SETUP_GUIDE.md
echo   - SETUP_CHECKLIST.md
echo.

pause
