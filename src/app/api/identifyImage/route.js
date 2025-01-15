import { analyzeImageWithLLava } from "../LLM/llm";
import { analyzeImageWithOpenAI } from "../LLM/openai";

export const POST = async (req) => {
  const { media } = await req.json();
  const imageUrl = media.source_url;

  // Call the OpenAI function
  const rawAltTag = await analyzeImageWithOpenAI(imageUrl);

  // Parse the raw string if it's stringified JSON
  let altTag;
  try {
    const parsed = JSON.parse(rawAltTag);
    altTag = parsed.alt_tag || rawAltTag; // Use parsed value or fallback
  } catch (error) {
    altTag = rawAltTag; // If not JSON, use as is
  }

  console.log({ alt_tag: altTag }, "response from POST /api/identifyImage");

  // Return the response wrapped in an object
  return Response.json({ alt_tag: altTag });
};
