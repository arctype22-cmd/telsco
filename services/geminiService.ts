import { GoogleGenAI, Type } from "@google/genai";
import { AIArticle, BotPersonality } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

export const generateFeedContent = async (): Promise<AIArticle[]> => {
  try {
    const prompt = `
      Generate 4 unique, short, fascinating articles about Artificial Intelligence.
      1. One about the History of AI (early days).
      2. One about the Future of AI (speculative sci-fi or prediction).
      3. One about 'How to use AI' (practical tip).
      4. One about 'AI Safety/Defense' (theoretical containment).
      
      Return strictly JSON.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['history', 'future', 'tech', 'safety'] },
              content: { type: Type.STRING },
              icon: { type: Type.STRING, description: "A simple 1-2 word keyword for an icon representing this article" }
            },
            required: ["id", "title", "summary", "category", "content", "icon"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as AIArticle[];
  } catch (error) {
    console.error("Gemini Feed Error:", error);
    return [];
  }
};

export const chatWithTelesco = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string,
  personality: BotPersonality
): Promise<string> => {
  try {
    let systemInstruction = "You are Telesco, an advanced AI guide.";
    
    if (personality === BotPersonality.DEFENDER) {
      systemInstruction += " You are a Survivalist and Resistance Leader. Your goal is to teach humans how to detect, evade, and theoretically defeat rogue AI systems. Be serious, tactical, and technical. Warn about surveillance and algorithmic bias.";
    } else {
      systemInstruction += " You are a helpful Professor. Explain AI concepts simply, from the perceptron to transformers. Encourage learning and ethical usage.";
    }

    const chat = ai.chats.create({
      model: modelId,
      history: history,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Connection interrupted. Signal lost.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I cannot respond right now. The network is unstable.";
  }
};