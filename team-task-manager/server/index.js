const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
