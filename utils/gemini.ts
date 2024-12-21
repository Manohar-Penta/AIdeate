import { GoogleGenerativeAI, ModelParams } from "@google/generative-ai";
import { systemPrompt } from "./systemPrompt";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY as string);

const params: ModelParams = {
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1.0,
    maxOutputTokens: 8000,
  },
  systemInstruction: systemPrompt,
};

export const model = genAI.getGenerativeModel(params);
