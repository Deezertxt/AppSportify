import React, { useState, useEffect } from "react";
import SmallCard from "../components/cards/SmallCard";
import { BsBookmark, BsCheckCircle, BsListTask, BsPencilSquare } from "react-icons/bs";
import { getUserById, getUserLibraryCategory, toggleProfilePrivacy } from "../api/api";
import { useAuth } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

function PerfilUser() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { userId: urlUserId } = useParams(); // Captura el ID del usuario desde la URL
    const [profileData, setProfileData] = useState(null);
    const [libraryData, setLibraryData] = useState({ recomendados: [], guardados: [], terminados: [] });
    const [isPrivate, setIsPrivate] = useState(false);
    const [activeTab, setActiveTab] = useState("recomendado");
    
    // Si no se pasa un ID en la URL, usa el ID del usuario logueado
    const userId = urlUserId || user.userId;

    useEffect(() => {
        if (!userId) return;

        const fetchProfile = async () => {
            try {
                const { data } = await getUserById(userId);
                setProfileData(data);
                setIsPrivate(data.isPrivate); // Asegúrate de que isPrivate se establece correctamente
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        const fetchLibrary = async () => {
            try {
                const recommendedResponse = await getUserLibraryCategory(userId, "recommended");
                const savedResponse = await getUserLibraryCategory(userId, "saved");
                const finishedResponse = await getUserLibraryCategory(userId, "finished");

                setLibraryData({
                    recomendados: recommendedResponse?.data?.recommended?.audiobooks || [],
                    guardados: savedResponse?.data?.saved?.audiobooks || [],
                    terminados: finishedResponse?.data?.finished?.audiobooks || [],
                });
            } catch (error) {
                console.error("Error al cargar los audiolibros:", error);
            }
        };

        fetchProfile();
        fetchLibrary();
    }, [userId]);

    const handleTogglePrivacy = async () => {
        try {
            // Enviar el estado actualizado de privacidad al backend
            const response = await toggleProfilePrivacy(userId, !isPrivate);
            setIsPrivate(!isPrivate);
        } catch (error) {
            console.error("Error al actualizar la privacidad:", error);
        }
    };

    if (!profileData) return <p>Cargando perfil...</p>;

    return (
        <div className="max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
            {/* Encabezado del perfil */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 text-center">
                <img
                    className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md"
                    src={profileData.profilePicUrl || "/default-profile.png"}
                    alt="Foto de perfil"
                />
                <h2 className="mt-4 text-xl font-bold">{profileData.fullName}</h2>
                <p className="text-sm">@{profileData.username}</p>
                <p className="mt-2 text-sm">{profileData.bio}</p>
                {user.userId === userId && (
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={() => navigate("/perfil/editar_perfil")}
                            className="px-4 py-2 bg-white text-blue-500 rounded-md flex items-center space-x-2 shadow hover:bg-gray-300"
                        >
                            <BsPencilSquare size={16} />
                            <span>Editar perfil</span>
                        </button>
                        <label className="flex items-center cursor-pointer">
                            <span className="text-sm mr-2">Perfil público:</span>
                            <input
                                type="checkbox"
                                checked={!isPrivate}
                                onChange={handleTogglePrivacy}
                                className="hidden"
                            />
                            <div
                                className={`w-10 h-5 flex items-center rounded-full p-1 ${!isPrivate ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full shadow transform ${!isPrivate ? "translate-x-5 bg-white" : "translate-x-0 bg-gray-500"
                                        }`}
                                />
                            </div>
                        </label>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200">
                <div className="flex justify-around bg-gray-100 text-gray-700">
                    {[  
                        { tab: "recomendado", label: "Recomendado", icon: <BsListTask size={20} /> },
                        { tab: "guardado", label: "Guardado", icon: <BsBookmark size={20} /> },
                        { tab: "terminados", label: "Terminados", icon: <BsCheckCircle size={20} /> },
                    ].map(({ tab, label, icon }) => (
                        <button
                            key={tab}
                            className={`flex-1 py-2 text-center flex flex-col items-center ${activeTab === tab
                                ? "border-b-4 border-blue-500 text-blue-500 font-semibold"
                                : "hover:text-blue-500"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {icon}
                            <span className="mt-1 text-sm">{label}</span>
                        </button>
                    ))}
                </div>

                {/* Contenido de los tabs */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeTab === "recomendado" && (
                        libraryData.recomendados.length > 0 ? (
                            libraryData.recomendados.map((item) => (
                                <SmallCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    author={item.author}
                                    coverUrl={item.coverUrl}
                                    className="transition-all transform hover:scale-105 hover:shadow-lg"
                                    
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No tienes recomendaciones aún.</p>
                        )
                    )}

                    {(user.userId === userId || !isPrivate) && activeTab === "guardado" && (
                        libraryData.guardados.length > 0 ? (
                            libraryData.guardados.map((item) => (
                                <SmallCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    author={item.author}
                                    coverUrl={item.coverUrl}
                                    className="transition-all transform hover:scale-105 hover:shadow-lg"
                                    
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No tienes elementos guardados aún.</p>
                        )
                    )}

                    {(user.userId === userId || !isPrivate) && activeTab === "terminados" && (
                        libraryData.terminados.length > 0 ? (
                            libraryData.terminados.map((item) => (
                                <SmallCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    author={item.author}
                                    coverUrl={item.coverUrl}
                                    className="transition-all transform hover:scale-105 hover:shadow-lg"
                                
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No has terminado ningún elemento aún.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default PerfilUser;
