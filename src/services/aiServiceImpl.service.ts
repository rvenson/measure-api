import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import AiService from "./aiService.interface";

class AiServiceImpl implements AiService {
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
  }

  public async readImage(base64Image : string) : Promise<number> {
    const prompt = `Read the image return only the main measure as a number. Return null if it's not possible.`;
    const image = { 
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      }
    }
    const result = await this.model.generateContent([image, prompt]);
    const estimated_value = result.response.text()
    return await Number.parseFloat(estimated_value);
  }
}

export default AiServiceImpl