require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { prisma } = require('./src/conf/db');  // Importa la conexión a la base de datos desde db.js
const app = express();
const port = 3000;
const routes = require('./src/api/endPoints');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

app.use('/', routes);

// Función para insertar categorías automáticamente al iniciar
async function seedCategories() {
  const categories = [
    { name: 'Superación Personal' },
    { name: 'Rivalidad y Competitividad' },
    { name: 'Mentalidad de Campeón' },
    { name: 'Trabajo en Equipo' },
    { name: 'Disciplina y Esfuerzo' },
    { name: 'Resiliencia y Perseverancia' },
    { name: 'Liderazgo en el Deporte' },
    { name: 'Técnicas de Motivación' },
    { name: 'Lecciones de Fracaso y Éxito' },
    { name: 'Pasión y Sacrificio' },
    { name: 'Autodeterminación' },
    { name: 'Ética y Juego Limpio' },
    { name: 'Desempeño Bajo Presión' },
    { name: 'Gestión de la Adversidad' },
    { name: 'Inspiración y Motivación Atlética' },
    { name: 'Historias de Rivalidades Icónicas' },
    { name: 'Desarrollo de Talento' },
    { name: 'Adaptación a los Desafíos' },
    { name: 'Momentos Decisivos en el Deporte' },
    { name: 'Leyendas del Deporte y su Legado' }
  ];

  // Insertar las categorías usando upsert para evitar duplicados
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {}, // No actualizar si ya existe
      create: category,
    });
  }

  console.log('Categorías insertadas o ya existentes');
}

// Ejecutar el seed de categorías al iniciar la app
seedCategories().catch((err) => {
  console.error('Error al insertar categorías:', err);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
