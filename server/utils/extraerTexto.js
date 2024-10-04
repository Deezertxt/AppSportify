const fs = require('fs');
const pdf = require('pdf-parser');

const extraerTexto = async (ruta) => {
    try {
        const dataBuffer = fs.readFileSync(ruta); 
        const data = await pdf(dataBuffer);            
        console.log(data.text);                        
        return data.text;
      } catch (error) {
        console.error('Error al extraer texto del PDF:', error);
      }
}

export default extraerTexto;