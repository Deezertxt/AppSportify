import { createContext, useContext, useState } from "react";
import { getLibrary} from "../api/api";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [savedBooks, setSavedBooks] = useState([]); // Libros guardados
  const [finishedBooks, setFinishedBooks] = useState([]); // Libros terminados

  // Inicializa el estado desde el backend
  const initializeLibrary = async (userId) => {
    try {
      const response = await getLibrary(userId); // Función que llama al backend
      if (response.status === 200) {
        const { saved, finished } = response.data;
        setSavedBooks(saved || []);
        setFinishedBooks(finished || []);
      }
    } catch (error) {
      console.error("Error initializing library:", error);
    }
  };

  // Añade un libro a la categoría "guardados"
  const addToSaved = (bookId) => {
    setSavedBooks((prev) => [...prev, bookId]);
    setFinishedBooks((prev) => prev.filter((id) => id !== bookId)); // Eliminar de terminados si aplica
  };

  // Añade un libro a la categoría "terminados"
  const addToFinished = (bookId) => {
    setFinishedBooks((prev) => [...prev, bookId]);
    setSavedBooks((prev) => prev.filter((id) => id !== bookId)); // Eliminar de guardados si aplica
  };

  // Verifica si un libro está guardado
  const isBookSaved = (bookId) => savedBooks.includes(bookId);

  // Verifica si un libro está terminado
  const isBookFinished = (bookId) => finishedBooks.includes(bookId);

  return (
    <LibraryContext.Provider
      value={{
        savedBooks,
        finishedBooks,
        initializeLibrary,
        addToSaved,
        addToFinished,
        isBookSaved,
        isBookFinished,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

// Hook para usar el contexto
export const useLibrary = () => useContext(LibraryContext);
