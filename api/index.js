const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const usersFilePath = './api/user.json';

// Route to retrieve user data
app.get('/api/user', (req, res) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        
        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error parsing user data' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
