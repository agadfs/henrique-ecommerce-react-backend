const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const productsDataPath = './api/user.json';

// Route to retrieve user data
app.get("/api/user", (req, res) => {
    fs.readFile(productsDataPath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading user data' });
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});

// Route to update user data
app.patch("/api/user/update/:userId", (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    fs.readFile(productsDataPath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading user data' });
        }
        let users = JSON.parse(data);
        const userToUpdateIndex = users.findIndex(user => user.id === userId);

        if (userToUpdateIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users[userToUpdateIndex] = { ...users[userToUpdateIndex], ...updatedUserData };

        fs.writeFile(productsDataPath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error updating user data' });
            }
            res.json({ message: 'User updated successfully' });
        });
    });
});


app.put("/api/user/update", (req, res) => {
    const updatedUsers = req.body;

    fs.writeFile(productsDataPath, JSON.stringify(updatedUsers, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating user data' });
        }
        res.json({ message: 'Users updated successfully' });
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

module.exports = app;