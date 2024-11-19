// context/authContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import { registerOrLoginWithGoogle, getUserById } from "../api/api";

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

    const resetPassword = async (email) => {    
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Correo de recuperación de contraseña enviado');
        } catch (error) {
            console.error('Error al enviar el correo de recuperación de contraseña:', error);
        }
    }
    

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user; // El usuario autenticado con Google
            const Token = await user.getIdToken(); // El token de autenticación de Firebase
            const response = await registerOrLoginWithGoogle({idToken:Token}); // Registra o inicia sesión con Google en tu servidor
            if (response.status === 200) {
                console.log("Usuario autenticado correctamente:", response.data);
              }
            setUser(user); // Guarda el usuario en el estado
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    useEffect(() => {
        const fetchUserFromBackend = async () => {
            try {
                const uid = user.uid; // Obtener el uid del usuario
                const response = await getUserById( uid ); // Enviar el uid al backend
                setUser((prevUser) => ({
                    ...prevUser,
                    userId: response.data.id, // Agregar el id del backend al usuario
                }));
            } catch (error) {
                console.error('Error al obtener el id del usuario desde el backend:', error);
            }
        };

        if (user) {
            fetchUserFromBackend();
        }
    }, [user]); // Ejecutar cada vez que el usuario cambie

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Establece el usuario
            setLoading(false); // Establece loading a false después de verificar el estado de autenticación
        });
        return () => unsubscribe(); // Desuscribirse cuando se desmonta el componente
    }, []);
    
    

    return (
        <authContext.Provider value={{ login, signUp, user, logout, loading, loginWithGoogle, resetPassword }}>
            {children}
        </authContext.Provider>
    );
}
