const express = require('express');
const chalk = require('chalk');
const request = require("supertest");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend Test');
});

app.use('/api', require('./routes/CalendarRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening at http://localhost:${PORT}`));
});
