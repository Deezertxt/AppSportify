import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Carousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const containerRef = useRef(null);

    const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = containerRef.current;
        const x = (clientX / offsetWidth) - 0.5;
        const y = (clientY / offsetHeight) - 0.5;
        setRotation({
            rotateX: y * 15,
            rotateY: -x * 15,
        });
    };

    const handleMouseLeave = () => {
        setRotation({ rotateX: 0, rotateY: 0 });
    };

    const changeImage = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(changeImage, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="mt-10 md:mt-0 md:max-w-lg md:mx-auto w-full max-w-2xl"
            style={{ perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: rotation.rotateX,
                rotateY: rotation.rotateY,
            }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <motion.div
                className="carousel-container relative w-full h-[500px] md:h-[600px] rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
            >
                {images.map((img, index) => (
                    <motion.img
                        key={index}
                        src={img}
                        alt={`Audiolibro ${index}`}
                        className="w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-in-out"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: currentImage === index ? 1 : 0,
                            scale: currentImage === index ? 1 : 0.95,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Carousel;
