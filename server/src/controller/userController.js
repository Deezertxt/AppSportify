const { admin } = require('../services/firebase');  // Para autenticar el token de Firebase
const {prisma} = require('../conf/db'); // Prisma ORM

// Endpoint para verificar el token y registrar/actualizar al usuario
const registerOrLoginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "Token de Google requerido." });
  }

  try {
    // Verificar el ID Token con Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUserId = decodedToken.uid; // Firebase user ID (uid)
    const email = decodedToken.email; // El email del usuario, lo puedes usar para verificar si ya existe en tu base de datos

    // Buscar el usuario en la base de datos usando el firebaseUserId
    let user = await prisma.user.findUnique({
      where: { id: firebaseUserId },
    });

    // Si el usuario no existe, lo creamos en la base de datos
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUserId,  // Usamos el id de Firebase como id
          email: email,         // Usamos el email de Google
          username: email.split('@')[0], // Puedes generar un nombre de usuario por defecto
        },
      });
    }

    // Devolver los detalles del usuario (o algún JWT de sesión si prefieres)
    res.status(200).json({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

  } catch (error) {
    console.error("Error al verificar el ID Token de Google:", error);
    res.status(500).json({ message: "Error al autenticar al usuario con Google." });
  }
};

// Crear usuario en la base de datos después del registro en Firebase
const createUser = async (req, res) => {
  console.log(req.body);
  const { firebaseUserId, username, email } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists in database' });
    }

    // Crear nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        id: firebaseUserId,
        username: username,
        email: email,
        language: "Español",
        bio: "",
        profilePicUrl: "",
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
};



// Eliminar usuario en la base de datos
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Eliminar el usuario en Prisma
    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user', details: error.message });
  }
};

// Obtener usuario por ID en la base de datos
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user', details: error.message });
  }
};

// Actualizar la información del usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio, profilePicUrl, language } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: name || user.username,
        email: email || user.email,
        bio: bio || user.bio,
        profilePicUrl: profilePicUrl || user.profilePicUrl,
        language: language || user.language,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user', details: error.message });
  }
};

module.exports = {
  registerOrLoginWithGoogle,
  createUser,
  deleteUser,
  updateUser,
  getUserById
};
