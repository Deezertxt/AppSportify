import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../utils/firebase";


export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context
};

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    };

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    };

    const logout = () => {
        signOut(auth);
    };

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsuscribe();
    }, []);
    return (
        <authContext.Provider value={{ signUp, login, user, logout, loading, loginWithGoogle }}> {children}</authContext.Provider>
    );
}