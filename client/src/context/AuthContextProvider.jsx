import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    async function signInWithGoogle() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            });
            if (error)
                throw new Error("A ocurrido un error durante la autenticación");
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // Función para registrarse con correo y contraseña
    async function signUpWithEmail(email, password) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw new Error("Error al registrarse: " + error.message);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    // Función para iniciar sesión con correo y contraseña
    async function signInWithEmail(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw new Error("Error al iniciar sesión: " + error.message);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function signout() {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw new Error("A ocurrido un error durante el cierre de sesión");
    }
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log("supabase event: ", event);
                if (session == null) {
                    navigate("/", { replace: true });
                } else {
                    setUser(session?.user.user_metadata);
                    const { user } = session;
                    console.log("data del usuario", session?.user.user_metadata);
                    navigate("/libros", { replace: true });
                }
            }
        );
        return () => {
            authListener.subscription;
        };
    }, []);

    return (
        <AuthContext.Provider value={{ signInWithGoogle, signUpWithEmail, signInWithEmail, signout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};