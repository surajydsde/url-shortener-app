# URL Shortener Web Application

A modern URL shortener web application built with Node.js, React, and Tailwind CSS. Similar to Bitly, it allows users to shorten long URLs and redirects to the original URL when the short URL is visited.

## Features

- 🔗 **Shorten URLs**: Convert long URLs into short, shareable links
- 📊 **Track Clicks**: Monitor how many times each shortened URL has been clicked
- 🔍 **Search & Filter**: Easily search through your shortened URLs
- 📋 **Manage URLs**: View all shortened URLs with creation dates and statistics
- 🗑️ **Delete URLs**: Remove URLs you no longer need
- 📋 **Copy to Clipboard**: Quickly copy short URLs with one click
- 🎨 **Modern UI**: Built with Tailwind CSS for a clean, responsive design

## Project Structure

```
url-shortener/
├── server/                 # Node.js/Express backend
│   ├── server.js          # Main server file
│   ├── package.json       # Server dependencies
│   ├── .env               # Environment variables
│   └── urls.db            # SQLite database (auto-created)
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # Tailwind CSS imports
│   │   ├── index.js       # React entry point
│   │   └── components/
│   │       ├── URLForm.js    # Form to create short URLs
│   │       ├── URLList.js    # Display list of URLs
│   │       └── URLCard.js    # Individual URL card component
│   ├── public/
│   │   └── index.html     # HTML entry point
│   ├── package.json       # Client dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── postcss.config.js  # PostCSS configuration
└── .gitignore             # Git ignore file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation & Setup

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Install Client Dependencies

```bash
cd ../client
npm install
```

## Running the Application

You'll need two terminal windows: one for the server and one for the client.

### Terminal 1 - Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

### Terminal 2 - Start the React Frontend

```bash
cd client
npm start
```

The frontend will automatically open at `http://localhost:3000`

## How It Works

### Creating a Short URL

1. Enter a long URL in the input field
2. Click "Shorten URL"
3. The application generates a 6-character short code
4. A short URL is created and displayed with a copy button

### Accessing a Shortened URL

1. When you visit a short URL (e.g., `http://localhost:3000/abc123`), the frontend passes this to the backend
2. The backend looks up the short code in the database
3. If found, it increments the click counter and redirects to the original URL
4. If not found, a 404 error is returned

### URL Management

- **View Statistics**: See creation date and click count for each URL
- **Search**: Filter URLs by original URL or short code
- **Copy**: Quickly copy short URLs to your clipboard
- **Delete**: Remove URLs from your collection

## API Endpoints

### POST `/api/shorten`
Create a new shortened URL

**Request:**
```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "short_code": "abc123",
  "short_url": "http://localhost:3000/abc123",
  "original_url": "https://example.com/very/long/url"
}
```

### GET `/:shortCode`
Redirect to original URL (increments click count)

### GET `/api/stats/:shortCode`
Get statistics for a shortened URL

**Response:**
```json
{
  "short_code": "abc123",
  "original_url": "https://example.com/very/long/url",
  "created_at": "2024-07-18T07:43:30Z",
  "click_count": 5
}
```

### GET `/api/urls`
Get all shortened URLs

**Response:**
```json
[
  {
    "short_code": "abc123",
    "original_url": "https://example.com/very/long/url",
    "created_at": "2024-07-18T07:43:30Z",
    "click_count": 5
  }
]
```

### DELETE `/api/urls/:shortCode`
Delete a shortened URL

## Environment Variables

**Server** (`.env`):
```
PORT=5000
BASE_URL=http://localhost:3000
```

## Database

The application uses SQLite3 for data storage. The database file (`urls.db`) is automatically created in the server directory when the server starts.

**Database Schema:**
```sql
CREATE TABLE urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  click_count INTEGER DEFAULT 0
)
```

## Technologies Used

- **Backend**: Node.js, Express.js, SQLite3
- **Frontend**: React 18, Tailwind CSS
- **Database**: SQLite3
- **Styling**: Tailwind CSS with PostCSS

## Future Enhancements

- User authentication and accounts
- Custom short codes
- URL analytics dashboard
- Expiring URLs
- QR code generation
- Rate limiting
- Admin panel
- URL categorization and tags

## License

MIT License - Feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on the repository.
