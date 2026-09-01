const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'server', 'urls.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('✅ Connected to SQLite database');
});

db.configure('busyTimeout', 5000);

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    click_count INTEGER DEFAULT 0
  )
`);

// Utility functions
function generateShortCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// === API ROUTES ===

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const insertUrl = (code) => {
    db.run(
      'INSERT INTO urls (short_code, original_url) VALUES (?, ?)',
      [code, url],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            insertUrl(generateShortCode());
          } else {
            console.error('Insert error:', err);
            res.status(500).json({ error: 'Database error' });
          }
        } else {
          const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
          res.json({ 
            short_code: code,
            short_url: `${baseUrl}/${code}`,
            original_url: url
          });
        }
      }
    );
  };

  insertUrl(generateShortCode());
});

app.get('/api/stats/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  db.get(
    'SELECT short_code, original_url, created_at, click_count FROM urls WHERE short_code = ?',
    [shortCode],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Short URL not found' });
      }

      res.json(row);
    }
  );
});

app.get('/api/urls', (req, res) => {
  db.all(
    'SELECT short_code, original_url, created_at, click_count FROM urls ORDER BY created_at DESC',
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(rows || []);
    }
  );
});

app.delete('/api/urls/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  db.run(
    'DELETE FROM urls WHERE short_code = ?',
    [shortCode],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Short URL not found' });
      }

      res.json({ message: 'URL deleted successfully' });
    }
  );
});

// === SERVE REACT BUILD ===
const buildPath = path.join(__dirname, 'client', 'build');
console.log('📦 Serving React build from:', buildPath);
app.use(express.static(buildPath, { maxAge: '1h', etag: false }));

// === CATCH-ALL: Handle short codes and React routing ===
app.all('*', (req, res) => {
  // Skip static files
  if (req.path.match(/\.[^/]*$/)) {
    return res.status(404).send('Not found');
  }

  const shortCode = req.path.slice(1); // Remove leading /

  // Empty path - serve React app
  if (!shortCode) {
    return res.sendFile(path.join(buildPath, 'index.html'));
  }

  // Check if this is a short code (no dots, reasonable length)
  if (!shortCode.includes('.') && shortCode.length <= 20) {
    db.get(
      'SELECT original_url, id FROM urls WHERE short_code = ?',
      [shortCode],
      (err, row) => {
        if (err) {
          console.error('Database error:', err);
          return res.sendFile(path.join(buildPath, 'index.html'));
        }

        if (row) {
          // Found matching short code - update click count and redirect
          db.run('UPDATE urls SET click_count = click_count + 1 WHERE id = ?', [row.id]);
          return res.redirect(row.original_url);
        }

        // Not a known short code - serve React app for client-side routing
        res.sendFile(path.join(buildPath, 'index.html'));
      }
    );
  } else {
    // Doesn't look like a short code - serve React app
    res.sendFile(path.join(buildPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 URL Shortener running on http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Database: ${dbPath}\n`);
});
