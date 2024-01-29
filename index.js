
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const productsDataPath = './api/user.json';




app.get("/api/user", (req, res) => {

    const data = fs.readFileSync(productsDataPath, 'utf8');
    const products = JSON.parse(data);
    res.json(products);


});

app.patch("/api/user/update/:userId", (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;


    fs.readFile(productsDataPath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error reading user datas' });
        } else {
            let users = JSON.parse(data);
            const userToUpdateIndex = users.findIndex(user => user.id === userId);

            if (userToUpdateIndex === -1) {
                res.status(404).json({ error: 'User not found' });
            } else {
                // Update the user data
                users[userToUpdateIndex] = { ...users[userToUpdateIndex], ...updatedUserData };

                // Write the updated user data back to the file
                fs.writeFile(productsDataPath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Error updating user data' });
                    } else {
                        res.json({ message: 'User updated successfully' });
                    }
                });
            }
        }
    });
});

app.put("/api/user/update", (req, res) => {

    const updatedProducts = req.body;


    fs.writeFile(productsDataPath, JSON.stringify(updatedProducts, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error updating products data' });
        } else {
            console.log(updatedProducts);
            res.json({ message: 'Products updated successfully' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});


