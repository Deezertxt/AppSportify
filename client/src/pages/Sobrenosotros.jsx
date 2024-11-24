import { motion } from "framer-motion";

function SobreNosotros() {
    return (
        <div className="bg-gradient-to-r from-[#8ECAE6] to-[#023047] min-h-screen flex items-center justify-center text-white p-6">
            <div className="max-w-5xl mx-auto text-center space-y-10">
                {/* Título con efecto 3D */}
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#FFFFFF] to-[#217e73] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Sobre Nosotros
                </motion.h1>

                {/* Descripción */}
                <motion.p
                    className="text-lg md:text-xl text-gray-200 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    Somos un equipo apasionado que busca ofrecer los mejores audiolibros
                    deportivos, transformando historias en experiencias sonoras.
                    Innovación, calidad y pasión son los pilares de nuestro trabajo.
                </motion.p>

                {/* Tarjetas del equipo */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                >
                    {[
                        { name: "Dylan Zeballos", role: "CEO", img: "https://ipaperds.com/wp-content/uploads/2023/03/Coolneans69_None-1024x1024.png" },
                        { name: "Richard Jhon Juanito", role: "DOS", img: "https://th.bing.com/th/id/OIP.L_PHt5BPnIduTyZYoq20IAHaHa?rs=1&pid=ImgDetMain" },
                        { name: "Giuliana Quispe", role: "CMO", img: "https://th.bing.com/th/id/R.91e3c5be1ca824ca31b9e8bb6d99737a?rik=sRLhwNO65t9RTQ&pid=ImgRaw&r=0" },
                        { name: "Carol Alegria", role: "CEO", img: "https://wallpaperaccess.com/full/4963702.jpg" },
                        { name: "Maus", role: "DOS", img: "https://yt3.ggpht.com/a/AGF-l7--KIDDXgX5_CkSVmYNi6N_GUt7jfX_eNHjbQ=s900-c-k-c0xffffffff-no-rj-mo" },
                        { name: "Sebas", role: "CMO", img: "https://i.pinimg.com/736x/51/d0/db/51d0db747e9d6b10ec085d6bc95e1321--naruto-the-movie-naruto-the-last.jpg" },
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-white text-black rounded-lg shadow-lg overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img src={member.img} alt={member.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-gray-700">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default SobreNosotros;
