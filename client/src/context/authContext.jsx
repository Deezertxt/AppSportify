// context/authContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Retorna la promesa de signInWithEmailAndPassword
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth); // Cierra sesión
        setUser(null); // Actualiza el estado de user a null después de hacer logout
    };
    

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Establece el usuario
            setLoading(false); // Establece loading a false después de verificar el estado de autenticación
        });
        return () => unsubscribe(); // Desuscribirse cuando se desmonta el componente
    }, []);
    
    

    return (
        <authContext.Provider value={{ login, signUp, user, logout, loading, loginWithGoogle }}>
            {children}
        </authContext.Provider>
    );
}
