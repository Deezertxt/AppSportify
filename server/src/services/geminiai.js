require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const testConnection = async () => {
    try {
        console.log('API Key:', process.env.API_KEY);  // Verifica que se cargue correctamente
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = "Hello, how are you?";
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error('Error testing connection:', error);
    }
};

testConnection();


