#!/usr/bin/env bash
# Build script for Render deployment

set -e  # Exit on any error

echo "Building URL Shortener App for Production..."

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install --production=false
cd ..

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install --production=false

# Build the React app
echo "Building React app..."
npm run build

# Verify build was created
if [ ! -d "build" ]; then
  echo "ERROR: Build directory not created!"
  exit 1
fi

echo "Build completed successfully!"
cd ..
