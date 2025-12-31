
import { GoogleGenAI, Type } from "@google/genai";
import { HealthRecord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generateHealthInsight(record: HealthRecord, history: HealthRecord[]): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise estes dados de saúde de forma observacional: 
        Atual: Glicemia ${record.glucose}mg/dL, Pressão ${record.pressureSystolic}/${record.pressureDiastolic}, Humor ${record.mood}.
        Histórico recente tem ${history.length} registros.
        Forneça um insight curto (máx 200 caracteres), acolhedor, SEM dar diagnósticos ou recomendações médicas prescritivas. 
        Mencione como o humor pode estar afetando os dados se notar um padrão.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text || "Continue monitorando seus dados para mais insights.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Mantenha o registro diário para entender melhor seu bem-estar.";
  }
}

export async function generateBiblicalMessage(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Gere uma mensagem bíblica curta, de conforto e esperança para alguém que está cuidando da saúde hoje. Cite o versículo.",
      config: {
        temperature: 0.8,
      },
    });
    return response.text || "O Senhor é o meu pastor, nada me faltará. (Salmos 23:1)";
  } catch (error) {
    return "O Senhor é o meu pastor, nada me faltará. (Salmos 23:1)";
  }
}
