import React, { useState, useEffect } from "react";
import CarouselCard from "../components/cards/CarouselCard";
import Categories from "../components/categorias/Categories";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import SkeletonCategoryButton from "../components/skeletons/SkeletonCategoryButton";
import { getAudiobooks } from "../api/api";

const Explorar = () => {
    const [trendingAudiobooks, setTrendingAudiobooks] = useState([]);
    const [recentAudiobooks, setRecentAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getAudiobooks();
                const audiobooks = response.data;

                const topRated = [...audiobooks].sort((a, b) => b.averageRating - a.averageRating).slice(0, 10);
                setTrendingAudiobooks(topRated);

                const recent = [...audiobooks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
                setRecentAudiobooks(recent);

            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 text-black min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Tendencias</h2>

            <div className="flex justify-center mb-8">
                <div className="w-full max-w-7xl">
                    {loading ? (
                        <div className="flex flex-wrap gap-4">
                            {[...Array(5)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <CarouselCard audiobooks={trendingAudiobooks} />
                    )}
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Categorias</h2>
            <div className="flex gap-4">
                {loading ? (
                    [...Array(6)].map((_, index) => (
                        <SkeletonCategoryButton key={index} />
                    ))
                ) : (
                    <Categories />
                )}
            </div>

            <h2 className="text-3xl font-bold mb-4 mt-8">Recientes</h2>
            <div className="flex justify-center mb-8">
                <div className="w-full max-w-7xl">
                    {loading ? (
                        <div className="flex flex-wrap gap-4">
                            {[...Array(5)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <CarouselCard audiobooks={recentAudiobooks} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explorar;
