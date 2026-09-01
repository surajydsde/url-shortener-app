# URL Shortener Web Application

A modern, full-stack URL shortener web application built with **Node.js**, **React**, and **Tailwind CSS**. Similar to **Bitly**, it allows users to shorten long URLs and automatically redirects to the original URL when the short URL is visited in a browser.

## 🌐 Live Demo

**[🔗 URL Shortener Live Demo](https://url-shortener-app-4gtd.onrender.com/)** - Click to try it now! (Free tier - may take 10-15 seconds to load initially)

## 🚀 Deploy Your Own

Deploy the URL Shortener to a **free server in 5 minutes**:

### Option 1: Render.com (Easiest) ⭐
1. Go to [Render.com](https://render.com)
2. Connect your GitHub account
3. Deploy → Fork this repo → Select it → Deploy
4. Takes ~2 minutes to go live!

**👉 [See Full Deployment Guide](./DEPLOYMENT.md)**

### Option 2: Railway.app
- 5 minutes setup
- Better performance than Render
- Free $5/month credits
- Full guide in [DEPLOYMENT.md](./DEPLOYMENT.md)

### Option 3: Self-Hosted
- Deploy to any server (AWS, DigitalOcean, etc.)
- Full control over infrastructure
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions

## 🌟 Features

- 🔗 **URL Shortening**: Convert long, complex URLs into 6-character short codes
- 🔄 **Auto-Redirect**: Visit a short URL and get automatically redirected to the original URL
- 📊 **Click Tracking**: Monitor how many times each shortened URL has been clicked
- 🔍 **Search & Filter**: Easily search through your shortened URLs by URL or short code
- 📋 **URL Management**: View all shortened URLs with creation dates, statistics, and metadata
- 🗑️ **Delete URLs**: Remove URLs you no longer need from your collection
- 📋 **Copy to Clipboard**: One-click copy of short URLs with visual feedback
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight**: No authentication required, open for everyone to use

## 📁 Project Structure & File Explanation

```
url-shortener-app/
│
├── 📄 README.md                    # Project documentation (this file)
├── 📄 QUICKSTART.md                # Quick reference guide for running
├── 📄 .gitignore                   # Git ignore rules (node_modules, .db, .env)
├── 📄 package.json                 # Root package file
│
├── 🗂️ server/                      # Backend (Express.js + Node.js)
│   ├── 📄 server.js                # Main server file (API endpoints)
│   ├── 📄 package.json             # Server dependencies & scripts
│   ├── 📄 .env                     # Environment variables (PORT, BASE_URL)
│   ├── 🗄️ urls.db                 # SQLite database (auto-created)
│   └── 📄 package-lock.json        # Dependency lock file
│
├── 🗂️ client/                      # Frontend (React + Tailwind)
│   ├── 🗂️ public/
│   │   └── 📄 index.html           # HTML entry point for React
│   │
│   ├── 🗂️ src/
│   │   ├── 📄 App.js               # Main App component (layout & state)
│   │   ├── 📄 App.css              # Global styles & Tailwind imports
│   │   ├── 📄 index.js             # React entry point
│   │   │
│   │   └── 🗂️ components/
│   │       ├── 📄 URLForm.js       # Form component to create short URLs
│   │       ├── 📄 URLList.js       # List component with search
│   │       └── 📄 URLCard.js       # Individual URL card component
│   │
│   ├── 📄 package.json             # Client dependencies & scripts
│   ├── 📄 package-lock.json        # Dependency lock file
│   ├── 📄 tailwind.config.js       # Tailwind CSS configuration
│   └── 📄 postcss.config.js        # PostCSS configuration
│
├── 🗂️ .git/                        # Git version control
│
├── 📝 start.bat                    # Windows startup script (one-click start)
└── 📝 start.sh                     # Linux/Mac startup script
```

## 📝 File Descriptions

### Backend Files

**server/server.js** - Main server file
- Sets up Express.js server
- Configures SQLite database
- Defines all API routes
- Handles URL shortening logic
- Implements redirect functionality
- Tracks click counts

**server/.env** - Environment configuration
```
PORT=5000                          # Server port
BASE_URL=http://localhost:3000    # Frontend URL for shortening
```

### Frontend Files

**client/src/App.js** - Root React component
- Manages app state (URLs list, loading)
- Fetches URLs from backend API
- Passes callbacks to child components
- Renders layout with form and list

**client/src/components/URLForm.js** - Form component
- Input field for long URL
- Submit button for shortening
- Error and success messages
- Loading state handling
- Calls `/api/shorten` endpoint

**client/src/components/URLList.js** - List display component
- Displays all shortened URLs
- Search/filter functionality
- Handles delete callbacks
- Shows empty state

**client/src/components/URLCard.js** - Individual URL card
- Shows original URL
- Displays short URL as clickable link
- Copy to clipboard button
- Shows creation date & click count
- Delete button
- Calls `/api/urls/:shortCode` endpoint for deletion

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14.0 or higher ([Download](https://nodejs.org/))
- **npm** v6 or higher (comes with Node.js)
- **Git** for cloning the repository

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/surajydsde/url-shortener-app.git
cd url-shortener-app
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
cd ..
```

3. **Install Frontend Dependencies**
```bash
cd client
npm install
cd ..
```

### Running the Application

You need **two terminal windows** to run the application:

**Terminal 1 - Start the Backend (Express Server)**
```bash
cd server
npm start
```
✅ Server will run on: `http://localhost:5000`
✅ Database will auto-create: `urls.db`

**Terminal 2 - Start the Frontend (React App)**
```bash
cd client
npm start
```
✅ Frontend will open at: `http://localhost:3000`
✅ React dev server will automatically reload on changes

### Using Startup Scripts (Alternative)

**Windows:**
```bash
double-click start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

## 📖 How It Works

### Step 1: Shorten a URL
1. Open `http://localhost:3000` in your browser
2. Enter a long URL (e.g., `https://www.example.com/path/to/very/long/url`)
3. Click "**Shorten URL**" button
4. A 6-character short code is generated (e.g., `abc123`)
5. The short URL is displayed: `http://localhost:3000/abc123`

### Step 2: Copy and Share
- Click the "**Copy**" button to copy the short URL to your clipboard
- Share the short URL with others
- The short URL is much easier to remember and share than the original

### Step 3: Access the Short URL
- Visit the short URL (e.g., `http://localhost:3000/abc123`)
- **Automatic Redirect**: You are instantly redirected to the original URL
- **Click Tracking**: The click count increments by 1
- The entire redirect happens in milliseconds

### Step 4: Manage Your URLs
- **View All**: All shortened URLs are displayed in the list
- **Search**: Use the search box to find URLs by original URL or short code
- **Statistics**: See when each URL was created and how many clicks it has
- **Delete**: Remove URLs you no longer need
- **Copy**: Quickly copy any short URL to clipboard

## 🗄️ Database Architecture

### SQLite Database Schema

```sql
CREATE TABLE urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  click_count INTEGER DEFAULT 0
)
```

### Why SQLite?
- ✅ **No setup required**: Works out of the box
- ✅ **Embedded**: Single-file database (`urls.db`)
- ✅ **Perfect for small to medium projects**: Great for prototypes and MVP
- ✅ **Portable**: Database travels with your code
- ✅ **Free and open-source**: No licensing costs

### Database Location
- **Linux/Mac**: `server/urls.db`
- **Windows**: `server\urls.db`

## 🔌 API Reference

All API endpoints are hosted on `http://localhost:5000`

### 1. Create a Shortened URL

**POST** `/api/shorten`

Creates a new shortened URL from a long URL.

**Request:**
```json
{
  "url": "https://www.example.com/very/long/url/path"
}
```

**Response (Success - 200):**
```json
{
  "short_code": "abc123",
  "short_url": "http://localhost:3000/abc123",
  "original_url": "https://www.example.com/very/long/url/path"
}
```

**Response (Error - 400):**
```json
{
  "error": "Invalid URL format"
}
```

---

### 2. Redirect to Original URL

**GET** `/:shortCode`

Redirects to the original URL and increments the click counter.

**Example:**
- Request: `GET /abc123`
- Response: HTTP 302 Redirect to original URL
- Side Effect: `click_count` incremented for this URL

**Error Response (404):**
```json
{
  "error": "Short URL not found"
}
```

---

### 3. Get URL Statistics

**GET** `/api/stats/:shortCode`

Retrieves statistics for a specific shortened URL.

**Example:**
- Request: `GET /api/stats/abc123`

**Response (200):**
```json
{
  "short_code": "abc123",
  "original_url": "https://www.example.com/very/long/url/path",
  "created_at": "2024-07-18T07:43:30.000Z",
  "click_count": 15
}
```

**Response (404):**
```json
{
  "error": "Short URL not found"
}
```

---

### 4. Get All Shortened URLs

**GET** `/api/urls`

Retrieves all shortened URLs (sorted by newest first).

**Response (200):**
```json
[
  {
    "short_code": "abc123",
    "original_url": "https://www.example.com/very/long/url/path",
    "created_at": "2024-07-18T07:43:30.000Z",
    "click_count": 15
  },
  {
    "short_code": "xyz789",
    "original_url": "https://github.com/surajydsde/url-shortener-app",
    "created_at": "2024-07-18T07:40:20.000Z",
    "click_count": 5
  }
]
```

---

### 5. Delete a Shortened URL

**DELETE** `/api/urls/:shortCode`

Removes a shortened URL from the database.

**Example:**
- Request: `DELETE /api/urls/abc123`

**Response (Success - 200):**
```json
{
  "message": "URL deleted successfully"
}
```

**Response (Error - 404):**
```json
{
  "error": "Short URL not found"
}
```

## 🔧 Environment Setup

### Server Configuration (.env)

Located in `server/.env`:
```bash
PORT=5000                    # Port where backend server runs
BASE_URL=http://localhost:3000  # Frontend URL for generating short URLs
```

### Frontend Configuration

**Proxy Setup** in `client/package.json`:
```json
"proxy": "http://localhost:5000"
```
This tells React to forward API calls to the Express backend.

**Tailwind CSS** in `client/tailwind.config.js`:
- Scans `src/**/*.js` and `public/index.html` for class names
- Generates optimized CSS with only used classes

## 🚨 Troubleshooting

### Issue: "Port already in use"
**Solution:**
```bash
# For Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For Mac/Linux - Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Issue: "Cannot find module" errors
**Solution:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database errors
**Solution:**
```bash
cd server
rm urls.db
npm start
```

### Issue: CORS errors in browser console
**Solution:**
- Ensure server is running on `http://localhost:5000`
- Ensure frontend is running on `http://localhost:3000`
- Check that `proxy` in `client/package.json` is set to `http://localhost:5000`

### Issue: Long URLs not being shortened
**Solution:**
- Check if URL starts with `http://` or `https://`
- Verify URL is valid using a URL validator
- Check browser console for error messages

## 🎨 UI/UX Features

- **Gradient Background**: Beautiful blue-to-indigo gradient
- **Responsive Layout**: Works on all screen sizes
- **Loading States**: Visual feedback during requests
- **Error Messages**: Clear error messages in red
- **Success Messages**: Confirmation on copy/creation (green)
- **Hover Effects**: Interactive elements have hover states
- **Smooth Transitions**: CSS transitions for smooth animations
- **Mobile Friendly**: Flex layout adapts to smaller screens

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

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **SQLite3** - Lightweight embedded database
- **CORS** - Cross-Origin Resource Sharing for frontend communication
- **dotenv** - Environment variable management

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool
- **React Scripts** - Create React App build tools

### Database
- **SQLite3** - No external database server needed, file-based storage

## 📈 Future Enhancements

Here are potential features to add:

- 🔐 **User Authentication**: Sign up/login with JWT tokens
- 🎨 **Custom Short Codes**: Allow users to choose their own short codes
- 📊 **Advanced Analytics**: Detailed charts and statistics dashboard
- ⏰ **URL Expiration**: Set expiration dates for URLs
- 🔗 **QR Code Generation**: Generate QR codes for short URLs
- 🛡️ **Rate Limiting**: Prevent abuse with request limits
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📧 **Email Notifications**: Send stats via email
- 🔐 **Private URLs**: Password-protected shortened URLs
- 🌍 **Custom Domain**: Use your own domain for short URLs
- 📱 **Mobile App**: Native iOS/Android apps
- 🔍 **URL Preview**: Preview page before redirecting
- 🏷️ **Tags & Categories**: Organize URLs with tags
- 📤 **Bulk Import**: Import multiple URLs at once
- 📥 **Bulk Export**: Export data to CSV/JSON

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## 📄 License

This project is open-source and available under the MIT License. You are free to use, modify, and distribute this project.

## 🙋 Support & Questions

- Create an [Issue](https://github.com/surajydsde/url-shortener-app/issues) for bug reports
- Start a [Discussion](https://github.com/surajydsde/url-shortener-app/discussions) for questions
- Check [Existing Issues](https://github.com/surajydsde/url-shortener-app/issues) for solutions

## 👨‍💻 Author

**Suraj** - [@surajydsde](https://github.com/surajydsde)

## ⭐ Star This Project!

If you found this project helpful, please give it a ⭐ on GitHub! It helps others discover the project.

---

**Happy URL Shortening! 🚀**
