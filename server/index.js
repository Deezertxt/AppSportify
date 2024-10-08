require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routes = require('./src/api/endPoints');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin: ["http://localhost:5174"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});