const fs = require('fs');
const pdf = require('pdf-parser');

const extraerTexto = async (ruta) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);  // Leer el archivo PDF
        const data = await pdf(dataBuffer);            // Extraer el texto del PDF
        console.log(data.text);                        // Mostrar el texto extraído en consola
        return data.text;
      } catch (error) {
        console.error('Error al extraer texto del PDF:', error);
      }
}

export default extraerTexto;