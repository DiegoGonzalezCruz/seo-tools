import axios from "axios";
import { OLLAMA_BASE_URL } from "./config";

export async function isOllamaRunning() {
  try {
    const response = await axios.get(OLLAMA_BASE_URL); // Root endpoint for health check
    if (response.status === 200 && response.data === "Ollama is running") {
      // console.log("Ollama is running 🚀");
      return true;
    } else {
      console.log("Ollama is not running. Please start it and try again.");
      return false;
    }
  } catch (error) {
    // toast.error("Ollama is not running. Please start it and try again.");
    // console.error("Error ❌:", error);
    return false;
  }
}
