#!/bin/bash

# URL Shortener - Startup Script for Mac/Linux

echo ""
echo "========================================"
echo "  URL Shortener Web Application"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Starting URL Shortener Application..."
echo ""
echo "This script will start:"
echo "1. Server (Backend) - runs on http://localhost:5000"
echo "2. Client (Frontend) - runs on http://localhost:3000"
echo ""

# Start the server in the background
echo "Starting server..."
cd server
npm start &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
sleep 3

# Start the client
echo "Starting client..."
cd client
npm start &
CLIENT_PID=$!
cd ..

echo ""
echo "Servers are starting. Browser should open automatically."
echo ""
echo "To stop the application:"
echo "  kill $SERVER_PID  (server)"
echo "  kill $CLIENT_PID  (client)"
echo ""
echo "Press Ctrl+C to stop the client development server."

wait
