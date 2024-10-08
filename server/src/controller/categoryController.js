const { prisma } = require('../conf/db');

// Crear una nueva categoría
const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });

        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category', details: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params; // El ID de la categoría a actualizar
    const { name } = req.body; // El nuevo nombre para la categoría

    try {
        const category = await prisma.category.update({
            where: { id: Number(id) },  // Usamos el ID para identificar la categoría
            data: { name },           // Actualizamos solo el nombre
        });

        res.status(200).json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Error updating category', details: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Error fetching categories', details: error.message });
    }
};

module.exports = {
    createCategory,
    updateCategory,
    getCategories,
};
