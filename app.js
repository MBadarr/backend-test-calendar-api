const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend Test!');
});

app.use('/api', require('./routes/CalendarRoutes'));

module.exports = app;