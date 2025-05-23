const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'grievances.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/submit', (req, res) => {
    const { message } = req.body;
    const grievance = { message, timestamp: new Date().toISOString() };
    const grievances = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    grievances.push(grievance);
    fs.writeFileSync(DATA_FILE, JSON.stringify(grievances, null, 2));
    res.sendStatus(200);
});

app.get('/inbox', (req, res) => {
    const grievances = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(grievances);
});

app.listen(PORT, () => {
    console.log('Server running at http://localhost:${PORT}');
});