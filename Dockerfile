FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy server and client source
COPY server ./server
COPY client ./client

# Install dependencies
RUN npm install

# Build React app
RUN npm run build

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
