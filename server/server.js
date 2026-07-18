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
const dbPath = path.join(__dirname, 'urls.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database');
});

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

// Generate short code (6 characters)
function generateShortCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// POST: Create short URL
app.post('/api/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  let shortCode = generateShortCode();
  
  // Ensure uniqueness
  const insertUrl = (code) => {
    db.run(
      'INSERT INTO urls (short_code, original_url) VALUES (?, ?)',
      [code, url],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            // Try again with a new code
            insertUrl(generateShortCode());
          } else {
            res.status(500).json({ error: 'Database error' });
          }
        } else {
          res.json({ 
            short_code: code,
            short_url: `${process.env.BASE_URL || 'http://localhost:3000'}/${code}`,
            original_url: url
          });
        }
      }
    );
  };

  insertUrl(shortCode);
});

// GET: Redirect to original URL
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  db.get(
    'SELECT original_url, id FROM urls WHERE short_code = ?',
    [shortCode],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Short URL not found' });
      }

      // Increment click count
      db.run('UPDATE urls SET click_count = click_count + 1 WHERE id = ?', [row.id]);

      // Redirect to original URL
      res.redirect(row.original_url);
    }
  );
});

// GET: Get URL stats
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

// GET: List all URLs
app.get('/api/urls', (req, res) => {
  db.all(
    'SELECT short_code, original_url, created_at, click_count FROM urls ORDER BY created_at DESC',
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(rows);
    }
  );
});

// DELETE: Delete URL
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
