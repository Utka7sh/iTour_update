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
    const { name, email, number,  password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    try {
        let insertData = { name, email, number, password: hashedPassword };
        
        if (userType === 'owner') {
            insertData = { ...insertData, ...req.body.ownerDetails };
            await knex('owners').insert(insertData);
            res.json({ name, email, number, userType: 'owner' });
        } else if (userType === 'rentee') {
            insertData = { ...insertData, ...req.body.renteeDetails };
            await knex('rentees').insert(insertData);
            res.json({ name, email, number, userType: 'rentee' });
        } else {
            res.status(400).json({ message: 'Invalid user type' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await knex('rentees').where({ email }).first();
        let userType = 'rentee';

        if (!user) {
            user = await knex('owners').where({ email }).first();
            userType = 'owner';
        }

        if (!user) {
            return res.status(401).json({ error: true, message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: true, message: 'Invalid email or password.' });
        }

        // Send rentee details on successful login
        res.json({
            name: user.name,
            email: user.email,
            number: user.number,
            age: user.age,
            city: user.city,
            number_of_travelmates: user.number_of_travelmates,
            budget: user.budget,
            gender: user.gender,
            userType
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: true, message: 'Server error' });
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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Registration and login logic...

// Route for the rentee dashboard
app.get('/rentee-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/rentee-dashboard.html'));
});

// Route for the owner dashboard (if not already included)
app.get('/owner-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/public/owner-dashboard.html'));
});


// Catch-all route for any other paths not handled above
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
