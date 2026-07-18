@echo off
REM URL Shortener - Startup Script for Windows

echo.
echo ========================================
echo   URL Shortener Web Application
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting URL Shortener Application...
echo.
echo This script will open two windows:
echo 1. Server (Backend) - runs on http://localhost:5000
echo 2. Client (Frontend) - runs on http://localhost:3000
echo.
pause

REM Start the server in a new window
echo Starting server...
start cmd /k "cd server && npm start"

REM Wait a moment for server to start
timeout /t 3 /nobreak

REM Start the client in a new window
echo Starting client...
start cmd /k "cd client && npm start"

echo.
echo Servers are starting. Browser should open automatically.
echo Press any key to close this window...
pause
