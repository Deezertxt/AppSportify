//EXAMPLE SERVER
import express from "express";
import cors from "cors";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import { PORT } from "./config/config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import { PrismaClient } from "@prisma/client/extension";

const prismaClient = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

app.use(cors());
app.use(express.json());

app.use(taskRoutes);

//app.use(express.static(join(__dirname, '../client/dist')))
app.use(express.static('../client/src/pages/index.html'))

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
