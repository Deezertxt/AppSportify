import express from "express";
import {audiolibros} from "../models/audiolibros.js";


const app = express();
const publicarContenido = express.Router();

app.use(express.json());

publicarContenido.get("/", (req, res) => {
    res.send("publicar audiolibro");
});

publicarContenido.get('/listar', (req, res) => {
    res.send(audiolibros);
});


publicarContenido.post('/', (req, res) => {
    let nuevo = req.body;
    const esta = audiolibros.filter((nuevo) => nuevo.nombre === nuevo);
    if (esta.length !== 0) return res.send("EXISTE");
    audiolibros.push(nuevo);
    res.send("añadido");
});


export default publicarContenido;