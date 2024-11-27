import { createContext, useContext, useState } from "react";
import { getLibrary, getUserLikes } from "../api/api";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [savedBooks, setSavedBooks] = useState([]); // Libros guardados
  const [finishedBooks, setFinishedBooks] = useState([]); // Libros terminados
  const [likedComments, setLikedComments] = useState([]); // Comentarios con like

  // Inicializa el estado desde el backend
  const initializeLibrary = async (userId) => {
    try {
      const response = await getLibrary(userId); // Función que llama al backend
      if (response.status === 200) {
        const { saved, finished } = response.data;
        setSavedBooks(saved || []);
        setFinishedBooks(finished || []);

        const likesResponse = await getUserLikes(userId);
        if (likesResponse.status === 200) {
          // Actualiza los comentarios con like
          // Almacena solo los feedbackIds de los comentarios con like
          const likedFeedbackIds = likesResponse.data.map(like => like.feedbackId);
          setLikedComments(likedFeedbackIds || []);
        }
      }
    } catch (error) {
      console.error("Error initializing library:", error);
    }
  };

  const addToSaved = (bookId) => {
    setSavedBooks((prev) => [...prev, bookId]);
    setFinishedBooks((prev) => prev.filter((id) => id !== bookId)); // Eliminar de terminados si aplica
  };

  // Añade un libro a la categoría "terminados"
  const addToFinished = (bookId) => {
    setFinishedBooks((prev) => [...prev, bookId]);
    setSavedBooks((prev) => prev.filter((id) => id !== bookId)); // Eliminar de guardados si aplica
  };

  const removeFromSaved = (bookId) => {
    setSavedBooks((prev) => prev.filter((id) => id !== bookId));
  };

  // Elimina un libro de la categoría "terminados"
  const removeFromFinished = (bookId) => {
    setFinishedBooks((prev) => prev.filter((id) => id !== bookId));
  };

  // Verifica si un libro está guardado
  const isBookSaved = (bookId) => savedBooks.includes(bookId);
  // Verifica si un libro está terminado
  const isBookFinished = (bookId) => finishedBooks.includes(bookId);
  

  const toggleLikeComment = (commentId) => {
    if (likedComments.includes(commentId)) {
      setLikedComments((prev) => prev.filter((id) => id !== commentId)); // Quitar el like
    } else {
      setLikedComments((prev) => [...prev, commentId]); // Agregar el like
    }
  };
  // Verifica si un comentario tiene like
  const isCommentLiked = (commentId) => likedComments.includes(commentId);



  return (
    <LibraryContext.Provider
      value={{
        savedBooks,
        finishedBooks,
        likedComments,
        initializeLibrary,
        isBookSaved,
        isBookFinished,
        isCommentLiked,
        toggleLikeComment,
        addToSaved,
        addToFinished,
        removeFromSaved,
        removeFromFinished,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

// Hook para usar el contexto
export const useLibrary = () => useContext(LibraryContext);
