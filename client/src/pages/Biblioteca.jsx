import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/cards/Card";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import { getUserLibraryCategory } from "../api/api";
import { useAuth } from "../context/authContext";
import { FiBookmark, FiCheckCircle, FiChevronRight } from "react-icons/fi";

const Biblioteca = () => {
    const { user } = useAuth();
    const userId = user.userId;

    const [savedCount, setSavedCount] = useState(0);
    const [finishedCount, setFinishedCount] = useState(0);
    const [savedAudiobooks, setSavedAudiobooks] = useState([]);
    const [finishedAudiobooks, setFinishedAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleViewAll = (category) => {
        navigate(`/libros?filter=${category}`);
    };

    useEffect(() => {
        const fetchLibraryData = async () => {
            setLoading(true);
            try {
                const savedResponse = await getUserLibraryCategory(userId, 'saved');
                const savedData = savedResponse?.data?.saved || {};  // Acceso correcto
                setSavedAudiobooks(savedData.audiobooks || []);
                setSavedCount(savedData.count || 0);

                const finishedResponse = await getUserLibraryCategory(userId, 'finished');
                const finishedData = finishedResponse?.data?.finished || {};  // Acceso correcto
                setFinishedAudiobooks(finishedData.audiobooks || []);
                setFinishedCount(finishedData.count || 0);
            } catch (error) {
                console.error("Error al cargar los audiolibros:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchLibraryData();
    }, [userId]);

    const renderAudiobookSection = (title, icon, audiobooks, category, count) => (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {icon}
                    <div>
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <div className="text-sm text-gray-500">{audiobooks.length} items</div>
                    </div>
                </div>
                <button
                    onClick={() => handleViewAll(category)}
                    className="text-blue-500 hover:text-blue-900 text-sm flex items-center gap-1"
                >
                    Ver todos <FiChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loading
                    ? [...Array(5)].map((_, index) => <SkeletonCard key={index} />)
                    : audiobooks.slice(0, 5).map((audiobook) => (
                        <Card
                            key={audiobook.id}
                            id={audiobook.id}
                            title={audiobook.title}
                            author={audiobook.author}
                            coverUrl={audiobook.coverUrl}
                            duration={audiobook.duration}
                            averagerating={audiobook.averageRating}
                        />
                    ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 text-black min-h-screen">
            {renderAudiobookSection(
                "Guardados",
                <FiBookmark />,
                savedAudiobooks,
                "saved",
                savedCount
            )}
            {renderAudiobookSection(
                "Terminados",
                <FiCheckCircle />,
                finishedAudiobooks,
                "finished",
                finishedCount
            )}
        </div>
    );
};

export default Biblioteca;