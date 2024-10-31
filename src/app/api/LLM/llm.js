import { Ollama } from '@langchain/community/llms/ollama'
import axios from 'axios' // Axios is used for fetching the image over HTTP
import { RunnableSequence } from '@langchain/core/runnables'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import sharp from 'sharp'

const BASE_URL = 'http://localhost:11434'
const MODEL_LLAVA = 'llava'
const MODEL_LLAMA3 = 'llama3'

function removeQuotes(text) {
  return text.replace(/["]+/g, '')
}

async function isOllamaRunning() {
  try {
    const response = await axios.get(`${BASE_URL}/health`) // Assuming the health check endpoint is `/health`
    if (response.status === 200) {
      console.log('Ollama is running 🚀')
      return true
    }
  } catch (error) {
    console.error('Ollama is not running ❌:', error)
    return false
  }
}

export async function fetchImageAsBase64(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    let imageBuffer = Buffer.from(response.data, 'binary')

    // Detect if the image is a WebP and convert it to JPEG
    if (response.headers['content-type'] === 'image/webp') {
      console.log('Converting WebP to JPEG image 🚀')
      imageBuffer = await sharp(imageBuffer).jpeg().toBuffer()
    }
    return imageBuffer.toString('base64')
  } catch (error) {
    console.error('Failed to fetch and convert image:', error)
    return null
  }
}

// Function to set up and invoke the LLM
export async function analyzeImageWithLLava(url) {
  // Check if Ollama is running before proceeding
  const ollamaRunning = await isOllamaRunning()
  if (!ollamaRunning) {
    // Return a response with a specific error message
    return { error: 'Ollama is not running. Please start it and try again.' }
  }

  const imageData = await fetchImageAsBase64(url)
  if (!imageData) {
    return { error: 'Failed to fetch the image. Cannot proceed with analysis.' }
  }

  const model = new Ollama({
    model: MODEL_LLAVA,
    baseUrl: BASE_URL,
  }).bind({
    images: [imageData],
  })

  const promptTemplate = PromptTemplate.fromTemplate(
    'Generate an ALT tag for this image. The description should be a clear, concise sentence without quotes or special characters.',
  )
  const chain = RunnableSequence.from([
    promptTemplate,
    model,
    new StringOutputParser(),
  ])

  const res = await chain.invoke()
  const cleanedRes = removeQuotes(res)
  return { altTag: cleanedRes } // Wrap the response in an object for consistency
}

const llm = new Ollama({ baseUrl: BASE_URL, model: MODEL_LLAMA3 })

const llmImages = new Ollama({
  baseUrl: BASE_URL,
  model: MODEL_LLAVA,
})

export { llm, llmImages }
