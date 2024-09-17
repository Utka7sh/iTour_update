const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve register when the /register URL is accessed
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Serve login when the /login URL is accessed
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register-user', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.json('Fill all the fields');
    }

    await db('Register').insert({ name, email, password });
    res.json({ name, email });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.json('Email already exists');
    } else {
      res.status(500).json('Error inserting user');
    }
  }
});

app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await db('Register').where({ email, password }).select('name', 'email');
    if (users.length) {
      res.json(users[0]);
    } else {
      res.json('Email or password is incorrect');
    }
  } catch (error) {
    res.status(500).json('Error querying user');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
