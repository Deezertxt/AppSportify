// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';

function Reproductor() {
    const [value, setValue] = useState(0);
    const [fontSize, setFontSize] = useState(16);

    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 32;

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const increaseFontSize = () => {
        setFontSize((prevSize) => Math.min(prevSize + 2, MAX_FONT_SIZE));
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(prevSize - 2, MIN_FONT_SIZE));
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
                    style={{overflow: 'auto', fontSize: `${fontSize}px` }}
                    className="border rounded-lg shadow p-6 w-1/2 h-96 mx-auto resize-none"
                >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias id placeat distinctio illum in quod omnis laboriosam laudantium ea cupiditate, cumque ad aliquam est tempore enim libero eaque quos earum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio aliquam magni labore rerum dolores iusto laborum nulla veniam illum ratione, dolor architecto! Ea corporis dolores voluptate, eos unde dolorem ut!
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
            <div className="flex flex-col justify-center items-center max-w-xl mx-auto border rounded p-6">

                <div className="flex items-center gap-4">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-circle-plus h-8 w-8">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 12h8"></path>
                            <path d="M12 8v8"></path>
                        </svg>
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-heart h-8 w-8">
                            <path
                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-rotate-ccw h-12 w-12">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-circle-pause h-16 w-16">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="10" x2="10" y1="15" y2="9"></line>
                            <line x1="14" x2="14" y1="15" y2="9"></line>
                        </svg>
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-rotate-cw h-12 w-12">
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                        </svg>
                    </button>

                    <button className="text-2xl">
                        <span>X1</span>
                    </button>

                    <button>
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
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center justify-between w-full mx-72 ">
                    <span id="tiempoActual" className="text-sm">0:00</span>
                    <span id="tiempoTotal" className="text-sm">n:00</span>
                </div>
            </div>
        </div>
    )
}

export default Reproductor;