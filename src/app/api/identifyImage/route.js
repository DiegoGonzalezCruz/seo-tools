import { analyzeImageWithLLava } from '../LLM/llm'

export const POST = async (req) => {
  console.log('POST /api/identifyImage')

  const { media } = await req.json()
  // Usage
  const imageUrl = media.source_url
  // console.log(imageUrl, 'imageUrl')
  const response = await analyzeImageWithLLava(imageUrl)
  console.log(response, 'response from POST /api/identifyImage')
  return Response.json(response)
}
