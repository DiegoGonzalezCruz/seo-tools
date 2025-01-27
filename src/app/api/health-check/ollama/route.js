import { isOllamaRunning } from "@/lib/ollama";

export const GET = async (req) => {
  // console.log("GET /api/health-check/ollama");

  const ollama = await isOllamaRunning();
  // console.log("Ollama is running:", ollama);

  return Response.json(ollama);
};
