// RouteContext.js
import React, { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export const useRouteContext = () => {
    return useContext(RouteContext);
};

export const RouteProvider = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState('/'); // Ruta inicial

    return (
        <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
            {children}
        </RouteContext.Provider>
    );
};
