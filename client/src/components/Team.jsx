function Team() {
    return ( //algo responsive 
        <div className="flex border shadow rounded-2xl h-auto w-full md:w-[1060px]">
            <div className="flex bg-gray-300 rounded  h-[250px] w-full md:h-[430px] md:w-[430px]">
            </div>
            <div className="p-4">
                <span className="font-bold text-[40px]">Equipo</span>
                <p className="text-[20px]">Descripcion</p>
            </div>
        </div>
    )
}

export default Team;