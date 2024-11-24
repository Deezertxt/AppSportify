import React, { useState, useEffect } from "react";
import CarouselCard from "../components/cards/CarouselCard";
import Categories from "../components/categorias/Categories";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import { getAudiobooks } from "../api/api";

const Explorar = () => {
    const [trendingAudiobooks, setTrendingAudiobooks] = useState([]);
    const [recentAudiobooks, setRecentAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState(5); // Inicializar con 5 para pantallas grandes

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getAudiobooks();
                const audiobooks = response.data;

                // Obtener los audiolibros mejor calificados
                const topRated = [...audiobooks]
                    .sort((a, b) => b.averageRating - a.averageRating)
                    .slice(0, 10);
                setTrendingAudiobooks(topRated);

                // Obtener los audiolibros más recientes
                const recent = [...audiobooks]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 10);
                setRecentAudiobooks(recent);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleItems(1); // En pantallas pequeñas (menos de 640px), mostrar 1 skeleton
            } else if (window.innerWidth < 1024) {
                setVisibleItems(2); // En pantallas medianas (menos de 1024px), mostrar 2 skeletons
            } else {
                setVisibleItems(5); // En pantallas grandes, mostrar 5 skeletons
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
            {/* Tendencias */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Tendencias</h2>
            <div className="flex justify-center mb-10">
                <div className="w-full max-w-7xl">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {[...Array(visibleItems)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <CarouselCard audiobooks={trendingAudiobooks} loading={loading} />
                    )}
                </div>
            </div>

            {/* Categorías */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Categorías</h2>
            <div className="flex justify-center mb-10">
                <div className="w-full max-w-5xl">
                    <Categories loading={loading} />
                </div>
            </div>

            {/* Recientes */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Recientes</h2>
            <div className="flex justify-center">
                <div className="w-full max-w-7xl">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {[...Array(visibleItems)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <CarouselCard audiobooks={recentAudiobooks} loading={loading} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explorar;
