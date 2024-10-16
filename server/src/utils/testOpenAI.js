const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
    try {
        const userMessage = "¿Cuál es la capital de Francia?"; // Mensaje de prueba

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });

        const answer = completion.choices[0].message.content;
        console.log("Respuesta de OpenAI:", answer);
    } catch (error) {
        console.error('Error en la prueba de OpenAI:', error);
    }
}

// Llamada a la función de prueba
testOpenAI();
