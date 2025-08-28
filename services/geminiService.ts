
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateExcuse(situation: string): Promise<string> {
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
        throw new Error("Failed to generate an excuse.");
    }
}
