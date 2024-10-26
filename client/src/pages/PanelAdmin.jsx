import React from "react";
import CardAdmin from "../components/CardAdmin";

function PanelAdmin() {
    return (
        <div>
            <div className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
                Panel de Administración
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-4">
                Lista de audiolibros 
            </div>

            <div className="card-row grid grid-cols-6 items-center border-b border-gray-300 py-4   pl-15 ml-3 ">
                {/* portada */}
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-10">
                <h1>
                    Portada
                </h1>
                    
                </div>
                
                {/* titulo */}
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-3">
                <h1>
                    Titulo
                </h1>
                    
                </div>
                
                {/* descripcion */}
                <div className="description text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis">
                <h1>
                    Descripcion 
                </h1>
                    
                </div>
                
                {/* autor */}
                <div className="author text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-7">
                <h1>
                    Autor
                </h1>
                    
                </div>
                
                {/* categ */}
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-4">
                <h1>
                    Categoria
                </h1>
                    
                </div>

                
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-6">
                <h1>
                    Accion
                </h1>
                    
                </div> 
            
            </div>
            <CardAdmin>
            </CardAdmin>


            <CardAdmin>
            </CardAdmin>
        </div>
        
    )
}

export default PanelAdmin;