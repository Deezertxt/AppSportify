function Team() {
    return ( //algo responsive
        <a href="#"
           className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                 src="https://placehold.co/400x400" alt=""/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Nombre del equipo</h5>
                <p className="mb-3 font-normal text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, metus ut laoreet vehicula, sapien libero convallis purus, vitae dictum odio nunc non nulla.</p>
            </div>
        </a>

    )
}

export default Team;