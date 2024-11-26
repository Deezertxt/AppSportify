import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter((segment) => segment);

    return (
        <nav className="text-sm mb-4">
            <ul className="flex items-center space-x-2">
                <li>
                    <Link to="/inicio" className="hover:underline text-blue-600">
                        Inicio
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const path = `/${pathSegments.slice(0, index + 1).join("/inicio")}`;
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <li key={path} className="flex items-center">
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <span className="font-semibold">{decodeURIComponent(segment)}</span>
                            ) : (
                                <Link to={path} className="hover:underline text-blue-600">
                                    {decodeURIComponent(segment)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Breadcrumb;
