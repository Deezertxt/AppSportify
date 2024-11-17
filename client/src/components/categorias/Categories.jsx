import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data); // Ajusta según la estructura de datos que devuelva tu API
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (id) => {
        navigate(`/categorias/${id}`); // Redirige a la página de categoría específica
    };

    return (
        <div className="flex flex-wrap gap-4 mt-8">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)} // Asigna el onClick
                    className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default Categories;
