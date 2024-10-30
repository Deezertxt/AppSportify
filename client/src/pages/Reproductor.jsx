import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AudiobookCover from "../components/AudiobookCover";
import ProgressBar from "../components/ProgressBar";
import AudioDetails from "../components/AudioDetails";
import ControlButtons from "../components/ControlButtons";
import PlayerControls from "../components/PlayerControls";
import { getAudiobookById } from "../api/api";

const Reproductor = () => {
    const { id } = useParams();
    const [audiobook, setAudiobook] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        const fetchAudiobook = async () => {
            try {
                const response = await getAudiobookById(id);
                setAudiobook(response.data);
            } catch (error) {
                console.error("Error fetching audiobook:", error);
                setAudiobook(null);
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
    const handleProgress = () => {
        if (audioRef.current) {
            const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setTotalDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (newProgress) => {
        if (audioRef.current && totalDuration > 0) {
            const newTime = (newProgress / 100) * totalDuration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress);
        }
    };
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
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed]);

    if (!audiobook) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
    }
return ( 
    <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto p-4">
            <button className="text-black font-bold mb-4 flex items-center">
                <FaArrowLeft className="mr-2" />
                Volver
            </button>
            <section className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <AudiobookCover coverImage={audiobook.coverImage} title={audiobook.title} />
                <AudioDetails
                    title={audiobook.title}
                    author={audiobook.author}
                    duration={audiobook.duration}
                />
            </section>
            <ProgressBar
                progress={progress}
                onProgressChange={handleProgressChange}
            />
            <ControlButtons
                isPlaying={isPlaying}
                onPlayPause={togglePlayPause}
                onBackward={handleBackward}
                onForward={handleForward}
            />
            <PlayerControls
                audioRef={audioRef}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleProgress}
                volume={volume}
                onVolumeChange={setVolume}
                speed={speed}
                onSpeedChange={setSpeed}
            />
        </main>
    </div>
);
}
export default Reproductor;