
import { GoogleGenAI } from "@google/genai";

export async function generateExcuse(situation) {
    let apiKey;

    // Safely check if 'process' and 'process.env' exist before trying to access them.
    // This prevents the 'ReferenceError: process is not defined' crash in browser environments.
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        apiKey = process.env.API_KEY;
    }

    if (!apiKey) {
        console.error("API key is not available. This is expected if process.env.API_KEY is not set.");
        throw new Error("AI 기능을 사용할 수 없습니다. API 키가 설정되지 않았습니다.");
    }

    // Initialize the AI client only when needed and if the key exists.
    const ai = new GoogleGenAI({ apiKey });

    try {
        const prompt = `You are a helpful and wise friend. A user is in a social situation in Korea where they feel pressured to drink alcohol, but they want to decline politely and firmly. The situation is: "${situation}". 
        
        Please provide one creative, natural, and respectful excuse they can use. The excuse should be in Korean. Keep it concise, ideally one or two sentences. Do not include any explanations or introductory phrases like "Here is an excuse:". Just provide the excuse itself.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.8,
                maxOutputTokens: 100,
            }
        });

        const text = response.text.trim();
        
        // Remove potential markdown like quotes
        return text.replace(/^"|"$/g, '');

    } catch (error) {
        console.error("Error generating excuse with Gemini API:", error);
        throw new Error("AI 모델 호출 중 오류가 발생했습니다.");
    }
}
