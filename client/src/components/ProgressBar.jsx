import React from "react";

const ProgressBar = ({ progress, totalDuration, onProgressChange }) => {
    // Función para manejar el clic en la barra de progreso
    const handleProgressClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newProgress = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);

        onProgressChange(newProgress); // Notificar al componente padre del nuevo progreso
    };

    // Función para formatear el tiempo en minutos y segundos
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Estilos en línea para el contenedor, la barra de fondo y la barra de progreso
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            fontFamily: 'Arial, sans-serif',
            color: '#555', // Color gris para el texto
        },
        timeText: {
            fontSize: '18px',
            color: '#fff',
            minWidth: '40px',
        },
        progressBarContainer: {
            position: 'relative',
            flexGrow: 1,
            height: '8px',
            backgroundColor: '#e0e0e0', // Fondo gris claro
            borderRadius: '4px',
            margin: '0 16px',
            cursor: 'pointer',
        },
        progressBar: {
            height: '100%',
            backgroundColor: '#4caf50', // Color verde para el progreso
            borderRadius: '4px',
            width: `${progress}%`,
            transition: 'width 0.1s linear',
        },
    };

    return (
        <div style={styles.container}>
            <span style={styles.timeText}>{formatTime((progress / 100) * totalDuration)}</span>
            <div
                style={styles.progressBarContainer}
                onClick={handleProgressClick}
            >
                <div style={styles.progressBar} />
            </div>
            <span style={styles.timeText}>{formatTime(totalDuration)}</span>
        </div>
    );
};

export default ProgressBar;
