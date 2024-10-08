//MODULO PARA EXTRAER TEXTO
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

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
