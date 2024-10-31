import sharp from 'sharp'

export const POST = async (req) => {
  const { imageObject, userData } = await req.json()

  try {
    // Fetch the image
    const response = await fetch(imageObject.source_url)
    if (!response.ok) {
      throw new Error('Failed to fetch the image.')
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fullFilename = imageObject.source_url.split('/').pop()
    const ext = fullFilename.split('.').pop().toLowerCase()
    const filename = fullFilename.split('.').slice(0, -1).join('.')

    if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
      return new Response(
        JSON.stringify({ error: 'Not a supported image type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    // Convert to WebP
    const webpBuffer = await sharp(buffer).webp().toBuffer()
    const webpBase64 = webpBuffer.toString('base64')
    console.log('Converted WebP Base64')

    return Response.json({ webpBase64, fullFilename: `${filename}.webp` })
  } catch (error) {
    console.error('Error converting and uploading image:', error)
    return Response.json({ error: error.message })
  }
}
