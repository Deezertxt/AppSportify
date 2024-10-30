import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    async function signInWithGoogle() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google'
            });
            return data;
        } catch (error) {
            console.log(error);
        }

        async function signOut() {
           const {error} = await supabase.auth.signOut();
           if(error) throw new Error ("Error signing out:");
        }
        useEffect(() => {
            const session = supabase.auth.session();
            setUser(session?.user ?? null);
            setLoading(false);

            const { data: authListener } = supabase.auth.onAuthStateChange(
                async (event, session) => {
                    const currentUser = session?.user;
                    setUser(currentUser ?? null);
                    setLoading(false);
                }
            );

            return () => {
                authListener.unsubscribe();
            };
        }, []);

        const value = { user, loading };

        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
}