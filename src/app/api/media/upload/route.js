import sharp from 'sharp'
import { getActiveWordPressInstance } from '@/lib/wordpress'

export const POST = async (req) => {
  // const { imageObject, userData } = await req.json()
  const { webpBase64, filename, userData } = await req.json()
  const { url, base64Credentials } = getActiveWordPressInstance(userData)

  try {
    // Decode the base64 string to get the buffer
    const webpBuffer = Buffer.from(webpBase64, 'base64')
    const webpBlob = new Blob([webpBuffer], { type: 'image/webp' })

    // Create form data using the form-data package
    const formData = new FormData()
    formData.append('file', webpBlob, `${filename}`)

    // const webpBlob = new Blob([webpBuffer], { type: 'image/webp' })

    // formData.append('file', webpBuffer, `${filename}.webp`)

    // Upload the WebP image to WordPress
    const uploadResponse = await fetch(`${url}/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
      body: formData,
    })

    // console.log(uploadResponse, 'uploadResponse')

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('Error response from upload:', errorText)
      throw new Error(`Failed to upload WebP image: ${errorText}`)
    }

    const uploadData = await uploadResponse.json()
    return Response.json(uploadData)
  } catch (error) {
    console.error('Error converting and uploading image:', error)
    return Response.json({ error: error.message })
  }
}
