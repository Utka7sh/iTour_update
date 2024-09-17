const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const knex = require('knex')(require('./knexfile'));
const bcrypt = require('bcrypt');
const app = express();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Registration endpoint
app.post('/register-user', upload.single('image'), async (req, res) => {
    const { name, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    try {
        let insertData = { name, email, password: hashedPassword };
        
        if (userType === 'owner') {
            insertData = { ...insertData, ...req.body.ownerDetails };
            await knex('owners').insert(insertData);
            res.json({ name, email, userType: 'owner' });
        } else if (userType === 'rentee') {
            insertData = { ...insertData, ...req.body.renteeDetails };
            await knex('rentees').insert(insertData);
            res.json({ name, email, userType: 'rentee' });
        } else {
            res.status(400).json({ message: 'Invalid user type' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For other routes such as /register.html, /login.html, etc., serve the static files
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/logout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'logout.html'));
});

// Catch-all route for any other paths not handled above
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
