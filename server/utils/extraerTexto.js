//MODULO PARA EXTRAER TEXTO
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const limpiarTexto = (texto) => {
  // Expresión regular para eliminar caracteres no alfabéticos, excepto espacios
  return texto.replace(/[*^#@!$%&()_+=\[\]{};':"\\|,.<>?\/`~]+/g, ' ') // Elimina asteriscos y otros caracteres especiales
              .replace(/\s+/g, ' ') // Reemplaza múltiples espacios por uno solo
              .trim(); // Elimina espacios al principio y al final
};

const extraerTexto = async (ruta) => {
    try {
        const dataBuffer = fs.readFileSync(ruta); 
        const data = await pdf(dataBuffer);
        const textoLimpio = limpiarTexto(data.text);            
        console.log(textoLimpio);                        
        return textoLimpio;
      } catch (error) {
        console.error('Error al extraer texto del PDF:', error);
      }
}

export default extraerTexto;
