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
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading file');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
