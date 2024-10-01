import  dotenv  from "dotenv";
//require('dotenv').config();
import express from "express";
import publicarContenidoRuta from './routes/publicarContenido.js'

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("inicio");
});


app.use('/publicar', publicarContenidoRuta);


app.listen(4000, () => {
    console.log("server corriendo en 4000");
});


