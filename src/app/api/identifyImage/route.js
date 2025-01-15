import { analyzeImageWithLLava } from "../LLM/ollama";
import { analyzeImageWithOpenAI } from "../LLM/openai";

export const POST = async (req) => {
  const { media, userData } = await req.json();
  console.log(userData, "userData");
  const imageUrl = media.source_url;

  // Call the OpenAI function

  let rawAltTag;

  if (userData.activeLLM === "openai") {
    rawAltTag = await analyzeImageWithOpenAI(imageUrl);
  } else if (userData.activeLLM === "ollama") {
    rawAltTag = await analyzeImageWithLLava(imageUrl);
  } else {
    throw new Error("Unsupported LLM");
  }

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
