import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './api/endPoints.js';
dotenv.config();
//require('dotenv').config();
//const express = require('express');
//const cors = require('cors');
//const routes = require('./src/api/endPoints');
const app = express();
const port = 3000;


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin: ["http://localhost:5174"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

app.use('/', routes, (req, res) => {
    res.send("jalando")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});