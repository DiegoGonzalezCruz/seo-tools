import axios from "axios"; // Axios is used for fetching the image over HTTP
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import sharp from "sharp";
import { Ollama } from "@langchain/ollama";
import { MODEL_LLAMA3, MODEL_LLAVA, OLLAMA_BASE_URL } from "@/lib/config";
import { isOllamaRunning } from "@/lib/ollama";

function removeQuotes(text) {
  return text.replace(/["]+/g, "");
}

export async function fetchImageAsBase64(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    let imageBuffer = Buffer.from(response.data, "binary");

    // Detect if the image is a WebP and convert it to JPEG
    if (response.headers["content-type"] === "image/webp") {
      // console.log("Converting WebP to JPEG image 🚀");
      imageBuffer = await sharp(imageBuffer).jpeg().toBuffer();
    }
    return imageBuffer.toString("base64");
  } catch (error) {
    console.error("Failed to fetch and convert image:", error);
    return null;
  }
}

// Function to set up and invoke the LLM
export async function analyzeImageWithLLava(url) {
  // Check if Ollama is running before proceeding
  const ollamaRunning = await isOllamaRunning();
  if (!ollamaRunning) {
    // Return a response with a specific error message
    return { error: "Ollama is not running. Please start it and try again." };
  }

  const imageData = await fetchImageAsBase64(url);
  if (!imageData) {
    return {
      error: "Failed to fetch the image. Cannot proceed with analysis.",
    };
  }

  const model = new Ollama({
    model: MODEL_LLAVA,
    baseUrl: OLLAMA_BASE_URL,
  }).bind({
    images: [imageData],
  });

  const promptTemplate = PromptTemplate.fromTemplate(
    "Generate an ALT tag for this image. The description should be a clear, concise sentence without quotes or special characters."
  );
  const chain = RunnableSequence.from([
    promptTemplate,
    model,
    new StringOutputParser(),
  ]);

  const res = await chain.invoke();
  const cleanedRes = removeQuotes(res);
  return { altTag: cleanedRes }; // Wrap the response in an object for consistency
}

const llm = new Ollama({ baseUrl: OLLAMA_BASE_URL, model: MODEL_LLAMA3 });

const llmImages = new Ollama({
  baseUrl: OLLAMA_BASE_URL,
  model: MODEL_LLAVA,
});

export { llm, llmImages };
