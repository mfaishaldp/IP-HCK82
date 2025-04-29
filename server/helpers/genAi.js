const API_KEY_GEMINI = process.env.API_KEY_GEMINI
const {GoogleGenAI} = require('@google/genai')

async function genAi(prompt) {
    const ai = new GoogleGenAI({ apiKey: API_KEY_GEMINI });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    return response.text
}

module.exports = genAi