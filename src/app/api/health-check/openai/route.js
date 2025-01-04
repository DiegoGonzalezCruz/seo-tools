export const GET = async (req) => {
  console.log("GET /api/health-check/ollama");
  const openai = true;

  return Response.json(openai);
};
