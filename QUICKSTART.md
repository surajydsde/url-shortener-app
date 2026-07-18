# Quick Start Guide - URL Shortener

## Prerequisites
- Node.js v14+ installed
- npm v6+

## Installation (One-time setup)

All dependencies are already installed! But if you need to reinstall:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

## Running the Application

### **Option 1: Quick Start (Windows)**
Simply double-click `start.bat` in the project root folder.

### **Option 2: Quick Start (Mac/Linux)**
```bash
chmod +x start.sh
./start.sh
```

### **Option 3: Manual Start (Recommended for debugging)**

**Terminal 1 - Start the Backend:**
```bash
cd server
npm start
```
Server will run on: `http://localhost:5000`

**Terminal 2 - Start the Frontend:**
```bash
cd client
npm start
```
Client will open automatically on: `http://localhost:3000`

## Using the Application

### Creating a Short URL
1. Go to `http://localhost:3000`
2. Enter a long URL (e.g., `https://www.example.com/path/to/page`)
3. Click "Shorten URL"
4. Your short URL will be generated and displayed
5. Click "Copy" to copy to clipboard

### Accessing a Shortened URL
- Visit the short URL in your browser (e.g., `http://localhost:3000/abc123`)
- You'll be automatically redirected to the original URL
- Click count increments automatically

### Managing URLs
- **Search**: Filter URLs using the search box
- **View Stats**: See creation date and click count
- **Copy**: Quickly copy short URLs to clipboard
- **Delete**: Remove URLs you no longer need

## Project Files Overview

```
portfolio-site-mhfd/
├── server/                          # Backend (Node.js + Express)
│   ├── server.js                   # Main API server
│   ├── urls.db                     # Database (auto-created)
│   ├── package.json                # Dependencies
│   └── .env                        # Environment config
│
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── App.js                  # Main component
│   │   ├── components/
│   │   │   ├── URLForm.js          # Shorten URL form
│   │   │   ├── URLList.js          # List of URLs
│   │   │   └── URLCard.js          # Individual URL card
│   │   └── index.js                # React entry point
│   ├── public/index.html           # HTML template
│   ├── tailwind.config.js          # Tailwind CSS config
│   └── package.json                # Dependencies
│
├── README.md                        # Full documentation
├── start.bat                        # Windows startup script
└── start.sh                         # Mac/Linux startup script
```

## API Endpoints

All APIs run on `http://localhost:5000`

### POST /api/shorten
Create a shortened URL
```json
{
  "url": "https://example.com/very/long/url"
}
```

### GET /:shortCode
Redirect to original URL (e.g., `/abc123`)

### GET /api/stats/:shortCode
Get URL statistics
- Returns: short_code, original_url, created_at, click_count

### GET /api/urls
Get all shortened URLs

### DELETE /api/urls/:shortCode
Delete a shortened URL

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- Server: Change `PORT` in `server/.env`
- Update `proxy` in `client/package.json` to match

### Database Issues
If you see database errors:
```bash
cd server
rm urls.db
npm start
```

### Module Not Found
Reinstall dependencies:
```bash
cd server && npm install
cd ../client && npm install
```

### Port 3000 not opening
Manually open: `http://localhost:3000` in your browser

## Features Included

✅ Shorten long URLs
✅ Redirect using short codes
✅ Track click counts
✅ Search and filter URLs
✅ Copy to clipboard
✅ Delete URLs
✅ Beautiful Tailwind CSS UI
✅ Responsive design
✅ No authentication required (open access)

## Future Enhancements

- User authentication
- Custom short codes
- QR code generation
- Analytics dashboard
- URL expiration
- Rate limiting

## Questions?

See `README.md` for detailed API documentation and implementation details.
