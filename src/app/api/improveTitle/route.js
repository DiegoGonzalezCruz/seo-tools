import { analyzeImageWithOpenAI } from "../LLM/openai";

export const POST = async (req) => {
  const { media } = await req.json();
  const imageTitle = media.title.rendered;

  // Call the OpenAI function
  const rawTitle = await analyzeImageWithOpenAI(imageTitle);

  // Parse the raw string if it's stringified JSON
  let title;
  try {
    const parsed = JSON.parse(rawTitle);
    title = parsed.title || rawTitle; // Use parsed value or fallback
  } catch (error) {
    title = rawTitle; // If not JSON, use as is
  }

  console.log({ title: title }, "response from POST /api/improveTitle");

  // Return the response wrapped in an object
  return Response.json({ title });
};
