
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/api/user', (req, res) => {
res.json({message: 'Hello from server!'})
})

