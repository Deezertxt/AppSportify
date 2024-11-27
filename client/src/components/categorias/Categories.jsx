import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import SkeletonCategoryButton from "../skeletons/SkeletonCategoryButton";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data); // Ajusta según la estructura de datos que devuelva tu API
            } catch (error) {
                console.error("Error loading categories:", error);
            } finally {
                setLoading(false); // Cambiar el estado de carga a false
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (id) => {
        navigate(`/explorar/categorias/${id}`);
    };

    return (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
            {loading
                ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <SkeletonCategoryButton key={index} />
                        ))} {/* Muestra 8 skeletons mientras se cargan las categorías */}
                    </div>
                )
                : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="relative w-full flex items-center justify-center px-4 py-3 text-sm sm:text-base rounded-lg bg-gradient-to-br from-sky-600 to-blue-900 text-white font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none"
                            >
                                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-lg"></span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Categories;
