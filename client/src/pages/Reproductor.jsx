import { useState, useEffect, useRef } from 'react';

function Reproductor() {
    const [value, setValue] = useState(0);
    const [fontSize, setFontSize] = useState(16);
    const [isPlaying, setIsPlaying] = useState(false);
    const [chunks, setChunks] = useState([]);
    const [speed, setSpeed] = useState(1);
    const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
    const [volume, setVolume] = useState(1); 
    const [elapsedTime, setElapsedTime] = useState(0); 
    const [totalTime, setTotalTime] = useState(0); 
    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);
    const timerRef = useRef(null);
    const textContainerRef = useRef(null);

    const text = `'Round your city, 'round the clock
Everybody needs you
No, you can't make everybody equal
Although you got beaucoup family
You don't even got nobody bein' honest with you
Breathe 'til I evaporated
My whole body see through
Transportation, handmade
And I know it better than most people
I don't trust 'em anyways
You can't break the law with them
Get some gushy, have a calm night
Shooters killin' left and right
Workin' through your worst night
If I get my money right
You know I won't need you
And I tell you (bitch)
I hope the sack is full up
I'm fuckin', no, I'm fucked up
Spend it when I get that
I ain't tryna keep you
Can't keep up a conversation
Can't nobody reach you
Why your eyes well up?
Did you call me from a seance?
You are from my past life
Hope you're doin' well, bruh
I been out here head first
Always like the head first
Signal comin' in and out
Hope you're doin' well, bruh
Everybody needs you
Everybody needs you
Ooh, nani nani
This feel like a Quaalude
No sleep in my body
Ain't no bitch in my body, ah
New beginnings, ah
New beginnings, wake up akh
The sun's goin' down
Time to start your day, bruh
Can't keep bein' laid off
Know you need the money if you gon' survive
Every night shit, every day shit
Droppin' baby off at home before my night shift
You know I can't hear none of that spend the night shit
That kumbaya shit
Wanna see nirvana, but don't wanna die yet
Wanna feel that na na though, could you come by?
Fuck with me after my shift
Know them boys wanna see me broke down and shit
Bummed out and shit, stressed out and shit
That's every day shit
Shut the fuck up, I don't want your conversation
Rollin' marijuana, that's a cheap vacation
My every day shit, every night shit, my every day shit
(Every night shit, night shit, night shit, night shit)
All my night, been ready for you all my night
Been waitin' on you all my night
I'll buzz you in, just let me know when you outside
All my night, you been missin' all my night
Still got some good nights memorized
And the look back's gettin' me right
Every night fucks every day up
Every day patches the night up
On God, you should match it, it's that KO
No white lighters 'til I fuck my 28th up
1998, my family had that Acura
Oh, the Legend
Kept at least six discs in the changer
Back when Boswell and Percy had it active
Couple bishops in the city buildin' mansions
All the reverends
Preachin' self made millionaire status
When we could only eat at Shoney's on occasion
After 'Trina hit I had to transfer campus
Your apartment out in Houston's where I waited
Stayin' with you when I didn't have a address
Fuckin' on you when I didn't own a mattress
Workin' on a way to make it outta Texas, every night
Droppin' baby off at home before my night shift, yeah
You know I can't hear none of that spend the night shit, kumbaya shit
Wanna see nirvana, but don't wanna die yet
Wanna feel that na na though, could you come by?
Fuck with me after my shift
You know them boys wanna see me broke down
See me bummed out, stressed out
That's just everyday shit
Shut the fuck up, I don't want your conversation
Rollin' marijuana, that's a cheap vacation
My every day shit, my every day shit
Every night shit, my every day shit
Every day shit, my every day shit
My every day shit, every night shit`; // Texto omitido para brevedad

    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 32;

    
    const createUtterance = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = volume;  // Set initial volume
        utterance.rate = speed;     // Set speech rate
        utterance.pitch = 1;        // Set pitch, default to 1
        utteranceRef.current = utterance;
        return utterance;
    };

    // Function to handle play/pause functionality
    const handlePlayPause = () => {
        if (!isPlaying) {
            const utterance = createUtterance();
            synthRef.current.speak(utterance);
        } else {
            synthRef.current.cancel();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const words = text.split(' ');
        const chunkSize = 200; // Número de caracteres por fragmento
        const textChunks = [];
        let chunk = '';

        words.forEach((word) => {
            if ((chunk + word).length <= chunkSize) {
                chunk += `${word} `;
            } else {
                textChunks.push(chunk.trim());
                chunk = `${word} `;
            }
        });

        if (chunk.trim()) {
            textChunks.push(chunk.trim());
        }

        setChunks(textChunks);

        // Calcular el tiempo total basado en el número de palabras y la velocidad
        const totalWords = words.length;
        const wordsPerMinute = 200 * speed; // 200 palabras por minuto a velocidad normal
        const estimatedTime = Math.ceil((totalWords / wordsPerMinute) * 60); // Convertir a segundos
        setTotalTime(estimatedTime);
    }, [text, speed]);

    useEffect(() => {
        if (isPlaying) {
            textToSpeech(chunks[value]);
            startTimer();
        }
    }, [value, isPlaying]);

    useEffect(() => {
        const currentChunk = document.getElementById(`chunk-${value}`);
        if (currentChunk) {
            currentChunk.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [value]);

    useEffect(() => {
        if (utteranceRef.current) {
            utteranceRef.current.volume = volume;
        }
    }, [volume]);

    const textToSpeech = (text) => {
        const synth = synthRef.current;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = speed;
        utterance.volume = volume;

        utteranceRef.current = utterance;

        utterance.onend = () => {
            if (value < chunks.length - 1) {
                setValue((prevValue) => prevValue + 1);
            } else {
                setIsPlaying(false);
                stopTimer();
            }
        };
        synth.speak(utterance);
    };

    const handleBackward = () => {
        if (value > 0) {
            const synth = synthRef.current;
            synth.cancel();
            setValue((prevValue) => prevValue - 1);
            setIsPlaying(true);
            setElapsedTime((prevTime) => Math.max(prevTime - 10, 0)); // Restar 10 segundos
        }
    };
    
    const handleForward = () => {
        if (value < chunks.length - 1) {
            const synth = synthRef.current;
            synth.cancel();
            setValue((prevValue) => prevValue + 1);
            setIsPlaying(true);
            setElapsedTime((prevTime) => Math.min(prevTime + 10, totalTime)); // Sumar 10 segundos
        }
    };

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setValue(newValue);
        const progressRatio = newValue / (chunks.length - 1);
        const newElapsedTime = Math.floor(totalTime * progressRatio);
        setElapsedTime(newElapsedTime);
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
        synth.cancel(); // Cancelar cualquier síntesis en curso
        setIsPlaying(true);
    };

    const handlePause = () => {
        const synth = synthRef.current;
        synth.pause();
        setIsPlaying(false);
        stopTimer();
    };

    const toggleSpeedMenu = () => {
        setIsSpeedMenuOpen(!isSpeedMenuOpen);
    };

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        const newElapsedTime = Math.floor((elapsedTime * speed) / newSpeed);
        setElapsedTime(newElapsedTime);
        setIsSpeedMenuOpen(false);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));  // Convert the input value to a float
    };   

    const startTimer = () => {
        stopTimer();
        timerRef.current = setInterval(() => {
            setElapsedTime((prevTime) => Math.min(prevTime + 1, totalTime));
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    

    return (
        <div className="flex flex-col justify-center py-10 gap-8">
            <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">Reproducir Audiolibro</span>
                <span>Nombre del Audiolibro</span>
            </div>

            <div className="flex flex-col justify-center gap-4">
                <div
                    ref={textContainerRef}
                    style={{ overflow: 'auto', fontSize: `${fontSize}px` }}
                    className="border rounded-lg shadow p-6 w-1/2 h-96 mx-auto resize-none w-3/4">
                    {chunks.map((chunk, index) => (
                        <span
                            key={index}
                            id={`chunk-${index}`}
                            style={{
                                fontWeight: index === value ? 'bold' : 'normal',
                                fontSize: index === value ? `${fontSize + 0.5}px` : `${fontSize}px`,
                                transition: 'font-size 0.3s ease'
                            }}
                        >
                            {chunk}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between mx-auto w-1/2">
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

            <div className="flex gap-6 justify-center items-center max-w-xl mx-auto border rounded-lg p-6 w-1/2">
                <div className='position: absolute left-[5px] h-1/2 pl-[30px] pt-[100px]'>
                    <img src="https://placehold.co/200x250" alt="" className="grounded-lg w-32 h-auto" />
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={handleBackward} className="h-12 w-12"><svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.4036 36.5256V37.6036H22.8176V36.5256H28.4036ZM31.2285 33.2356V32.0736H33.8605V42.1956H32.5725V33.2356H31.2285ZM37.0289 37.0296C37.0289 35.4242 37.2902 34.1736 37.8129 33.2776C38.3355 32.3722 39.2502 31.9196 40.5569 31.9196C41.8542 31.9196 42.7642 32.3722 43.2869 33.2776C43.8095 34.1736 44.0709 35.4242 44.0709 37.0296C44.0709 38.6629 43.8095 39.9322 43.2869 40.8376C42.7642 41.7429 41.8542 42.1956 40.5569 42.1956C39.2502 42.1956 38.3355 41.7429 37.8129 40.8376C37.2902 39.9322 37.0289 38.6629 37.0289 37.0296ZM42.8109 37.0296C42.8109 36.2176 42.7549 35.5316 42.6429 34.9716C42.5402 34.4022 42.3209 33.9449 41.9849 33.5996C41.6582 33.2542 41.1822 33.0816 40.5569 33.0816C39.9222 33.0816 39.4369 33.2542 39.1009 33.5996C38.7742 33.9449 38.5549 34.4022 38.4429 34.9716C38.3402 35.5316 38.2889 36.2176 38.2889 37.0296C38.2889 37.8696 38.3402 38.5742 38.4429 39.1436C38.5549 39.7129 38.7742 40.1702 39.1009 40.5156C39.4369 40.8609 39.9222 41.0336 40.5569 41.0336C41.1822 41.0336 41.6582 40.8609 41.9849 40.5156C42.3209 40.1702 42.5402 39.7129 42.6429 39.1436C42.7549 38.5742 42.8109 37.8696 42.8109 37.0296Z" fill="#0B0A0A"/>
                        <path d="M3.32086 10.7942V26.0319M3.32086 26.0319H18.5586M3.32086 26.0319L15.1047 14.9592C18.6117 11.4582 23.1615 9.19167 28.0686 8.50127C32.9757 7.81086 37.9743 8.73394 42.3111 11.1314C46.648 13.5289 50.0883 17.2709 52.1135 21.7936C54.1388 26.3163 54.6393 31.3746 53.5398 36.2065C52.4402 41.0385 49.8001 45.3821 46.0172 48.5831C42.2343 51.7841 37.5136 53.6689 32.5663 53.9537C27.6191 54.2384 22.7133 52.9076 18.5882 50.1618C14.463 47.416 11.342 43.4039 9.6953 38.73" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </button>
                        <button onClick={isPlaying ? handlePause : handlePlay} className="h-16 w-16">
                            {isPlaying ? (
                                // Icono de Pausa
                                <svg width="79" height="71" viewBox="0 0 79 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="39.8715" cy="35.6591" rx="38.9744" ry="35.0376" fill="black"/>
                                <rect x="27.8971" y="20.5408" width="7.53232" height="30.2365" rx="3.76616" fill="white"/>
                                <rect x="44.0378" y="20.5408" width="7.53232" height="30.2365" rx="3.76616" fill="white"/>
                                </svg>

                            ) : (
                                // Icono de Reproducir
                                <svg width="79" height="71" viewBox="0 0 79 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="39.8715" cy="35.6591" rx="38.9744" ry="35.0376" fill="black"/>
                                <path d="M30 51.5V16.5L58.875 34L30 51.5Z" fill="#FEF7FF"/>
                                </svg>

                            )}
                        </button>
                        <button onClick={handleForward} className="h-12 w-12"><svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.5428 38.52H26.5608V41.544H25.3708V38.52H22.4028V37.442H25.3708V34.404H26.5608V37.442H29.5428V38.52ZM32.2535 34.138V32.976H34.8855V43.098H33.5975V34.138H32.2535ZM38.0538 37.932C38.0538 36.3266 38.3152 35.076 38.8378 34.18C39.3605 33.2746 40.2752 32.822 41.5818 32.822C42.8792 32.822 43.7892 33.2746 44.3118 34.18C44.8345 35.076 45.0958 36.3266 45.0958 37.932C45.0958 39.5653 44.8345 40.8346 44.3118 41.74C43.7892 42.6453 42.8792 43.098 41.5818 43.098C40.2752 43.098 39.3605 42.6453 38.8378 41.74C38.3152 40.8346 38.0538 39.5653 38.0538 37.932ZM43.8358 37.932C43.8358 37.12 43.7798 36.434 43.6678 35.874C43.5652 35.3046 43.3458 34.8473 43.0098 34.502C42.6832 34.1566 42.2072 33.984 41.5818 33.984C40.9472 33.984 40.4618 34.1566 40.1258 34.502C39.7992 34.8473 39.5798 35.3046 39.4678 35.874C39.3652 36.434 39.3138 37.12 39.3138 37.932C39.3138 38.772 39.3652 39.4766 39.4678 40.046C39.5798 40.6153 39.7992 41.0726 40.1258 41.418C40.4618 41.7633 40.9472 41.936 41.5818 41.936C42.2072 41.936 42.6832 41.7633 43.0098 41.418C43.3458 41.0726 43.5652 40.6153 43.6678 40.046C43.7798 39.4766 43.8358 38.772 43.8358 37.932Z" fill="#0B0A0A"/>
                        <path d="M58.952 10.7943V26.032M58.952 26.032H43.7143M58.952 26.032L47.1936 14.9592C43.6905 11.4539 39.143 9.18209 34.2364 8.48613C29.3298 7.79016 24.3299 8.70776 19.9902 11.1006C15.6504 13.4935 12.206 17.2321 10.1758 21.7529C8.1457 26.2737 7.63989 31.3319 8.73461 36.1652C9.82933 40.9985 12.4653 45.345 16.2452 48.5499C20.0252 51.7548 24.7444 53.6442 29.6916 53.9337C34.6389 54.2231 39.5462 52.8967 43.6741 50.1545C47.802 47.4123 50.9268 43.4027 52.5776 38.73" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </button>

                        <div className='p-4 text-2xl font-bold'>
                            <button onClick={toggleSpeedMenu} className="relative">
                                {speed}x
                                {isSpeedMenuOpen && (
                                    <div className="absolute bg-white border rounded-md shadow-md bottom-full mb-2">
                                        {[0.5, 1, 1.5, 2].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => handleSpeedChange(s)}
                                                className="block w-full px-4 py-2 hover:bg-gray-200"
                                            >
                                                {s}x
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </button>
                        </div>

                        <div className='transform'>
                            <span className="text-lg"></span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-full"
                            />
                        </div> 
                    </div>



                    <div className="flex justify-between items-center mt-6">
                        <div className="flex flex-col items-center">
                            <input
                                type="range"
                                min="0"
                                max={chunks.length - 1}
                                value={value}
                                onChange={handleChange}
                                className="w-[450px] h-2" // Cambia 500px al tamaño que necesites
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reproductor;
