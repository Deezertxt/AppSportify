import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PORT } from './config/config.js';


const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("funca")
})


app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});