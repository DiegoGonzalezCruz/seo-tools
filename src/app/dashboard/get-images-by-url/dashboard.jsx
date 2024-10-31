'use client'
import InputImageURL from '@/components/Dashboard/InputImageURL'

const DashboardGetImages = ({ userData }) => {
  const handleImageConversion = async (url, userData) => {
    try {
      // Convert the image to WebP format
      const { fullFilename, webpBase64 } = await convertImage(
        { source_url: url },
        userData,
      )
      // Save the converted image
      const saveResult = await saveImage(
        webpBase64,
        fullFilename,
        'convertedImages',
      )
      return { success: true, message: saveResult.filePath }
    } catch (error) {
      console.error('Error converting image:', error)
      return { success: false, message: 'Conversion failed' }
    }
  }
  return (
    <div>
      <InputImageURL
        userData={userData}
        onSubmit={handleImageConversion}
        buttonLabel="Convert Image"
      />
    </div>
  )
}

export default DashboardGetImages
