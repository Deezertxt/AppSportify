import  supabase  from '../utils/supabase';

// Función para registro con email y contraseña
export const registerWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return user;
};

// Función para inicio de sesión con email y contraseña
export const loginWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return user;
};

// Función para autenticación con Google
export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw error;
  return user;
};
