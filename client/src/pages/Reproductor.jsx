import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AudiobookCover from "../components/AudiobookCover";
import ChapterText from "../components/ChapterText";
import ProgressBar from "../components/ProgressBar";
import AudioDetails from "../components/AudioDetails";
import ControlButtons from "../components/ControlButtons";
import PlayerControls from "../components/PlayerControls";
import { getAudiobookById } from "../api/api"; // Importa la función para obtener el audiolibro


const Reproductor = () => {
    const { id } = useParams();
    const [audiobook, setAudiobook] = useState(null);
    const [fontSize, setFontSize] = useState('16px');
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    // Agrega un valor de prueba para `audioSrc` (enlace público)
    const audioSrc = "https://www.safewalking.es/wp-content/uploads/Prueba-de-nivel-nuevos-alumnos-listening-1.mp3"; // Audio de prueba

    useEffect(() => {
        const fetchAudiobook = async () => {
            try {
                const response = await getAudiobookById(id); // Llama a la API con el ID
                setAudiobook(response.data); // Establece el audiolibro en el estado
            } catch (error) {
                console.error("Error fetching audiobook:", error);
                setAudiobook(null); // Maneja errores
            }
        };

        fetchAudiobook();
    }, [id]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Manejar actualización de progreso
    const handleProgress = () => {
        if (audioRef.current) {
            const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(currentProgress);
            setTotalDuration(audioRef.current.duration);
        }
    };

    // Manejar cambio de volumen
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Manejar cambio de velocidad de reproducción
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed]);

    // Manejar cambio de progreso al arrastrar el botón de progreso
    const handleProgressChange = (newProgress) => {
        if (audioRef.current) {
            const newTime = (newProgress / 100) * totalDuration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress);
        }
    };

    // Arreglar retroceso y adelanto de 10 segundos
    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
        }
    };
    if (!audiobook) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
    }
    return (
        <div className="flex flex-col h-screen bg-econd">
            <div className="flex-grow flex items-center justify-center">
                <ChapterText text={audiobook.text} fontSize={fontSize} />
            </div>

            <div className="bg-first text-white p-4 flex flex-col items-center">
                <ProgressBar
                    progress={progress}
                    totalDuration={totalDuration}
                    onProgressChange={handleProgressChange}
                />

<<<<<<< HEAD
                <div className="flex justify-between items-center w-full mt-4"> {/* Asegúrate de que ocupe todo el ancho */}
                    {/* Detalles del Audiolibro */}
                    <div className="flex items-start mb-2">
                        <AudiobookCover coverUrl={audiobook.coverUrl} className="w-25 h-20 object-cover" />
                        <div className="ml-4"> {/* Agregando margen izquierdo aquí */}
                            <AudioDetails title={audiobook.title} author={audiobook.author} />
=======
                <div className="flex justify-between  mx-auto w-1/2">
                    <button onClick={increaseFontSize} className="flex gap-1 text-xl font-medium items-center">A
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-circle-plus">
                        <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12h8"></path>
                            <path d="M12 8v8"></path>
                        </svg>
                    </button>
                    <button onClick={decreaseFontSize} className="flex gap-1 text-xl font-medium items-center">A
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-circle-minus">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12h8"></path>
                        </svg>
                    </button>
                </div>
            </div>


            <div className='relative flex justify-center items-center min-h-[200px]'>

                <div className='absolute left-0 top-1/2 transform -translate-y-1/2'>
                    <svg width="110" height="107" viewBox="0 0 110 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.56">
                    <path opacity="0.41" d="M22.7356 93.3158C20.2347 93.3158 18.0748 92.4674 16.256 90.7707C14.5129 89.0002 13.6414 86.8978 13.6414 84.4634V22.4968C13.6414 20.0624 14.5129 17.9968 16.256 16.3001C18.0748 14.5296 20.2347 13.6444 22.7356 13.6444H86.3953C88.8962 13.6444 91.0182 14.5296 92.7613 16.3001C94.5801 17.9968 95.4895 20.0624 95.4895 22.4968V84.4634C95.4895 86.8978 94.5801 89.0002 92.7613 90.7707C91.0182 92.4674 88.8962 93.3158 86.3953 93.3158H22.7356ZM22.7356 84.4634H86.3953V22.4968H22.7356V84.4634ZM27.2827 75.611H81.8482L64.7965 53.4801L51.1551 71.1848L40.9241 57.9063L27.2827 75.611ZM22.7356 84.4634V22.4968V84.4634Z" fill="#1D1B20"/>
                    </g>
                    </svg>
                </div>

                <div className='flex-grow'>
                <div className="flex gap-6 justify-center items-center max-w-xl mx-auto border rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-4">
                            {/* <button id="add-library">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-circle-plus h-8 w-8">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 12h8"></path>
                                    <path d="M12 8v8"></path>
                                </svg>
                            </button>

                            <button id="favorite">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-heart h-8 w-8">
                                    <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                            </button> */}

                            <button id="backward" onClick={handleBackward}>
                            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.4036 36.5256V37.6036H22.8176V36.5256H28.4036ZM31.2285 33.2356V32.0736H33.8605V42.1956H32.5725V33.2356H31.2285ZM37.0289 37.0296C37.0289 35.4242 37.2902 34.1736 37.8129 33.2776C38.3355 32.3722 39.2502 31.9196 40.5569 31.9196C41.8542 31.9196 42.7642 32.3722 43.2869 33.2776C43.8095 34.1736 44.0709 35.4242 44.0709 37.0296C44.0709 38.6629 43.8095 39.9322 43.2869 40.8376C42.7642 41.7429 41.8542 42.1956 40.5569 42.1956C39.2502 42.1956 38.3355 41.7429 37.8129 40.8376C37.2902 39.9322 37.0289 38.6629 37.0289 37.0296ZM42.8109 37.0296C42.8109 36.2176 42.7549 35.5316 42.6429 34.9716C42.5402 34.4022 42.3209 33.9449 41.9849 33.5996C41.6582 33.2542 41.1822 33.0816 40.5569 33.0816C39.9222 33.0816 39.4369 33.2542 39.1009 33.5996C38.7742 33.9449 38.5549 34.4022 38.4429 34.9716C38.3402 35.5316 38.2889 36.2176 38.2889 37.0296C38.2889 37.8696 38.3402 38.5742 38.4429 39.1436C38.5549 39.7129 38.7742 40.1702 39.1009 40.5156C39.4369 40.8609 39.9222 41.0336 40.5569 41.0336C41.1822 41.0336 41.6582 40.8609 41.9849 40.5156C42.3209 40.1702 42.5402 39.7129 42.6429 39.1436C42.7549 38.5742 42.8109 37.8696 42.8109 37.0296Z" fill="#0B0A0A"/>
                                <path d="M3.32086 10.7942V26.0319M3.32086 26.0319H18.5586M3.32086 26.0319L15.1047 14.9592C18.6117 11.4582 23.1615 9.19167 28.0686 8.50127C32.9757 7.81086 37.9743 8.73394 42.3111 11.1314C46.648 13.5289 50.0883 17.2709 52.1135 21.7936C54.1388 26.3163 54.6393 31.3746 53.5398 36.2065C52.4402 41.0385 49.8001 45.3821 46.0172 48.5831C42.2343 51.7841 37.5136 53.6689 32.5663 53.9537C27.6191 54.2384 22.7133 52.9076 18.5882 50.1618C14.463 47.416 11.342 43.4039 9.6953 38.73" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            </button>

                            <button onClick={isPlaying ? handlePause : handlePlay} id="play-pause">
                                {isPlaying ? (
                                    <svg width="79" height="71" viewBox="0 0 79 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="39.8715" cy="35.6591" rx="38.9744" ry="35.0376" fill="black"/>
                                        <rect x="27.8971" y="20.5408" width="7.53232" height="30.2365" rx="3.76616" fill="white"/>
                                        <rect x="44.0378" y="20.5408" width="7.53232" height="30.2365" rx="3.76616" fill="white"/>
                                    </svg>

                                ) : (
                                    <svg width="79" height="71" viewBox="0 0 79 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="39.8715" cy="35.6591" rx="38.9744" ry="35.0376" fill="black"/>
                                        <path d="M30 51.5V16.5L58.875 34L30 51.5Z" fill="#FEF7FF"/>
                                    </svg>

                                )}
                            </button>

                            <button id="fordward" onClick={handleForward}>
                            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.5428 38.52H26.5608V41.544H25.3708V38.52H22.4028V37.442H25.3708V34.404H26.5608V37.442H29.5428V38.52ZM32.2535 34.138V32.976H34.8855V43.098H33.5975V34.138H32.2535ZM38.0538 37.932C38.0538 36.3266 38.3152 35.076 38.8378 34.18C39.3605 33.2746 40.2752 32.822 41.5818 32.822C42.8792 32.822 43.7892 33.2746 44.3118 34.18C44.8345 35.076 45.0958 36.3266 45.0958 37.932C45.0958 39.5653 44.8345 40.8346 44.3118 41.74C43.7892 42.6453 42.8792 43.098 41.5818 43.098C40.2752 43.098 39.3605 42.6453 38.8378 41.74C38.3152 40.8346 38.0538 39.5653 38.0538 37.932ZM43.8358 37.932C43.8358 37.12 43.7798 36.434 43.6678 35.874C43.5652 35.3046 43.3458 34.8473 43.0098 34.502C42.6832 34.1566 42.2072 33.984 41.5818 33.984C40.9472 33.984 40.4618 34.1566 40.1258 34.502C39.7992 34.8473 39.5798 35.3046 39.4678 35.874C39.3652 36.434 39.3138 37.12 39.3138 37.932C39.3138 38.772 39.3652 39.4766 39.4678 40.046C39.5798 40.6153 39.7992 41.0726 40.1258 41.418C40.4618 41.7633 40.9472 41.936 41.5818 41.936C42.2072 41.936 42.6832 41.7633 43.0098 41.418C43.3458 41.0726 43.5652 40.6153 43.6678 40.046C43.7798 39.4766 43.8358 38.772 43.8358 37.932Z" fill="#0B0A0A"/>
                                <path d="M58.952 10.7943V26.032M58.952 26.032H43.7143M58.952 26.032L47.1936 14.9592C43.6905 11.4539 39.143 9.18209 34.2364 8.48613C29.3298 7.79016 24.3299 8.70776 19.9902 11.1006C15.6504 13.4935 12.206 17.2321 10.1758 21.7529C8.1457 26.2737 7.63989 31.3319 8.73461 36.1652C9.82933 40.9985 12.4653 45.345 16.2452 48.5499C20.0252 51.7548 24.7444 53.6442 29.6916 53.9337C34.6389 54.2231 39.5462 52.8967 43.6741 50.1545C47.802 47.4123 50.9268 43.4027 52.5776 38.73" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            </button>

                            {/* <button id="speed" className="text-2xl">
                                <span>X1</span>
                            </button>

                            <button id="volume">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-volume-2 h-8 w-8">
                                    <path
                                        d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                                    <path d="M16 9a5 5 0 0 1 0 6"></path>
                                    <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
                                </svg>
                            </button> */}
>>>>>>> 93503f2acaafc716913fb558e4f928d98b247179
                        </div>

                        <div className="w-full mt-4">
                            <div className="w-11/12 mx-auto">
                                <div>
                                    <input
                                        type="range"
                                        min="0"
                                        max={chunks.length - 1}
                                        value={value}
                                        onChange={handleChange}
                                        className="w-full bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>  
                        
                        
                    </div>
<<<<<<< HEAD

                    {/* Controles de Reproducción con ControlButtons */}
                    <ControlButtons
                        isPlaying={isPlaying}
                        togglePlay={togglePlayPause}
                        handleBackward={handleBackward}
                        handleForward={handleForward}
                    />
=======
                              
                </div>
                </div>

                

            </div>
            
            
>>>>>>> 93503f2acaafc716913fb558e4f928d98b247179

                    {/* Control de Velocidad y Volumen */}
                    <div className="flex items-center">
                        <PlayerControls speed={speed} setSpeed={setSpeed} volume={volume} setVolume={setVolume} />

                    </div>
                    {/* Elemento de audio oculto */}
                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        onTimeUpdate={handleProgress}
                        onLoadedMetadata={() => setTotalDuration(audioRef.current.duration)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Reproductor;
