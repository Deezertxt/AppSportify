import { useState, useEffect, useRef } from 'react';

function Reproductor() {
    const [value, setValue] = useState(0);
    const [fontSize, setFontSize] = useState(16);
    const [isPlaying, setIsPlaying] = useState(false);
    const [chunks, setChunks] = useState([]);
    const synthRef = useRef(window.speechSynthesis);
    const text = "MODELO DE NEGOCIO\n" +
        "Mantener una vida activa es esencial para el ser humano, un concepto que se ha evidenciado a lo largo de la historia. Con el tiempo, han surgido diversas disciplinas deportivas, alcanzando aproximadamente 149. En este contexto, hemos decidido enfocarnos en el baloncesto, especialmente en la NBA, que es la liga más reconocida a nivel mundial y el tercer deporte más visto y practicado. Esta elección se debe a su amplio público y a la pasión que genera entre los aficionados.\n" +
        "A pesar de ser el tercer deporte más conocido existen pocas plataformas donde los aficionados o incluso los mismos jugadores puedan encontrar inspiración, motivación e información acerca de la disciplina para su propio desarrollo.\n" +
        "\n" +
        "\n" +
        "El aprendizaje ha sido un pilar esencial en la sociedad, y la lectura, una de sus formas más comunes, suele resultar tediosa para muchas personas al intentar finalizar un libro. En respuesta a esta problemática, han surgido herramientas que utilizan tecnología de inteligencia artificial, como el text-to-speech, para crear resúmenes de libros, facilitando el acceso a la información sin la necesidad de leer el texto completo.\n" +
        "Las estadísticas recientes revelan un cambio significativo en los hábitos de consumo de contenido entre los jóvenes de 17 a 25 años, aunque una minoría significativa también reveló a gente mayor de 33 años. Un 70,4% de ellos prefiere el formato digital sobre el físico, debido a factores como la falta de tiempo y la dificultad para mantener la atención en la lectura prolongada. Además, la mayoría de los encuestados dedican entre 30 minutos y una hora a la lectura casual, lo que ha incrementado el uso de formatos breves, como los audiolibros. Un 53,7% de los encuestados prefiere escuchar audiolibros de 15 minutos o menos, resaltando la necesidad de contenido adaptado a tiempos de atención más cortos.\n" +
        "Otra estadística relevante es que el 92,6% de los encuestados valora una plataforma que ofrezca resúmenes de textos referentes a la vida saludable, lo que refleja un gran interés por herramientas que faciliten el acceso eficiente a la información. \n" +
        "Resumidamente, los resultados obtenidos por el trabajo de campo nos muestra una opinión positiva en cuanto a la realización de una página web en Bolivia, sobre temas deportivos basados en audiolibros y resúmenes textuales. \n";

    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 32;

    useEffect(() => {
        const chunkSize = 200; // Adjust chunk size as needed
        const words = text.split(' ');
        const textChunks = [];
        let chunk = '';

        words.forEach(word => {
            if ((chunk + word).length <= chunkSize) {
                chunk += `${word} `;
            } else {
                textChunks.push(chunk.trim());
                chunk = `${word} `;
            }
        });

        if (chunk) {
            textChunks.push(chunk.trim());
        }

        setChunks(textChunks);
    }, [text]);

    const textToSpeech = (text) => {
        const synth = synthRef.current;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.onend = () => {
            if (value < chunks.length - 1) {
                setValue((prevValue) => prevValue + 1);
                textToSpeech(chunks[value + 1]);
            } else {
                setIsPlaying(false);
            }
        };
        synth.speak(utterance);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(chunks[event.target.value]);
        handlePause();
    };

    const increaseFontSize = () => {
        setFontSize((prevSize) => Math.min(prevSize + 2, MAX_FONT_SIZE));
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(prevSize - 2, MIN_FONT_SIZE));
    };

    const handlePlay = () => {
        const synth = synthRef.current;
        synth.cancel(); // Cancel any ongoing speech synthesis
        textToSpeech(chunks[value]);
        setIsPlaying(true);
    };

    const handlePause = () => {
        const synth = synthRef.current;
        synth.pause();
        setIsPlaying(false);
    };
    return (
        <div className="flex flex-col justify-center py-10 gap-8">
            <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">Reproducir Audiolibro</span>
                <span>Nombre del Audiolibro</span>
            </div>

            <div className="flex flex-col justify-center gap-4">
                <textarea
                    readOnly
                    rows="10"
                    cols="50"
                    style={{overflow: 'auto', fontSize: `${fontSize}px`}}
                    className="border rounded-lg shadow p-6 w-1/2 h-96 mx-auto resize-none"
                >
                {text}
                </textarea>
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
            <div className="flex gap-6 justify-center items-center max-w-xl mx-auto border rounded-lg p-6">

                <div>
                    <img src="https://placehold.co/200x250" alt="" className="rounded-lg"/>
                </div>


                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4">
                        <button id="add-library">
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
                        </button>

                        <button id="redo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-rotate-ccw h-12 w-12">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                        </button>

                        <button onClick={isPlaying ? handlePause : handlePlay} id="play-pause">
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-circle-pause h-16 w-16">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="10" x2="10" y1="15" y2="9"></line>
                                    <line x1="14" x2="14" y1="15" y2="9"></line>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-circle-play h-16 w-16">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                </svg>
                            )}
                        </button>

                        <button id="undo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-rotate-cw h-12 w-12">
                                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                            </svg>
                        </button>

                        <button id="speed" className="text-2xl">
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
                        </button>
                    </div>

                    <div className="w-full">
                        <div>
                            <input
                                type="range"
                                min="0"
                                max={chunks.length - 1}
                                value={value}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <span id="tiempoActual" className="text-sm">0:00</span>
                            <span id="tiempoTotal" className="text-sm">n:00</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Reproductor;