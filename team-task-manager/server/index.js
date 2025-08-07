const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '..', 'docs')));

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// ROUTES

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword]
    );

    const token = jwt.sign({ id: newUser.rows[0].user_id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login a user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).json('Invalid Credential');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json('Invalid Credential');
    }

    const token = jwt.sign({ id: user.rows[0].user_id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user data
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await pool.query('SELECT user_id, user_name, user_email FROM users WHERE user_id = $1', [req.user.id]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// File Management API
const docsDir = path.join(__dirname, '..', 'docs');

// Get all files in docs
app.get('/api/files', (req, res) => {
  fs.readdir(docsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files');
    }
    res.json(files);
  });
});

// Upload a file
const upload = multer({ dest: docsDir });
app.post('/api/files/upload', upload.single('file'), (req, res) => {
  res.json({ msg: 'File uploaded successfully' });
});

// Delete a file
app.delete('/api/files/:path', (req, res) => {
  const filePath = path.join(docsDir, req.params.path);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send('Error deleting file');
    }
    res.json({ msg: 'File deleted successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
