'use client'
import { useState } from 'react'
import InputImageURL from '@/components/Dashboard/InputImageURL'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'

const DashboardPDFCreator = ({ userData }) => {
  const [targetClass, setTargetClass] = useState('')
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePDFCreation = async (url, userData) => {
    try {
      const res = await fetch('/api/createPDFFromURL', {
        method: 'POST',
        body: JSON.stringify({ url, userData, targetClass }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        const blob = await res.blob()
        const contentDisposition = res.headers.get('Content-Disposition')
        const filenameMatch =
          contentDisposition && contentDisposition.match(/filename="(.+)"/)
        const filename = filenameMatch ? filenameMatch[1] : 'download.pdf'

        // Create a download link and trigger the download
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()

        return { success: true, message: 'PDF generated successfully' }
      } else {
        return { success: false, message: 'Failed to generate PDF' }
      }
    } catch (error) {
      console.error('Error during PDF creation:', error)
      return { success: false, message: 'Error during PDF creation' }
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    console.log('handleFileUpload:')
    if (!file) {
      console.log('No file uploaded')
      toast('error', {
        title: 'No file uploaded',
        description: 'Please upload a .txt file before proceeding.',
        status: 'error',
      })
      return
    }

    const reader = new FileReader()

    reader.onload = async (e) => {
      const text = e.target.result
      const urls = text.split('\n').filter(Boolean)
      console.log('urls:', urls)

      setIsProcessing(true)
      setProgress(0)

      const totalUrls = urls.length
      let processedUrls = 0

      for (const url of urls) {
        // Display a toast while processing each URL
        const processingToastId = toast('loading', {
          title: `Processing PDF for URL: ${url}`,
          description: 'Generating PDF, please wait...',
          status: 'loading',
          duration: Infinity,
        })

        try {
          const res = await handlePDFCreation(url, userData)
          console.log('res:', res)

          if (res.success) {
            toast.dismiss(processingToastId)
            toast('Success', {
              title: 'PDF Created',
              description: `Successfully created PDF for URL: ${url}`,
              status: 'success',
            })
          } else {
            toast('error', {
              title: 'PDF Generation Failed',
              description: `Failed to create PDF for URL: ${url}`,
              status: 'error',
            })
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: `Error generating PDF for URL: ${url}`,
            status: 'error',
          })
        }

        // Update progress
        processedUrls++
        setProgress((processedUrls / totalUrls) * 100)
      }

      setIsProcessing(false)
    }

    reader.readAsText(file)
  }

  return (
    <div className="">
      <InputImageURL
        userData={userData}
        onSubmit={handlePDFCreation}
        buttonLabel="Create PDF"
      />
      <div className="my-4">
        <Label className="label">Enter Content Class Name (optional):</Label>
        <Input
          type="text"
          value={targetClass}
          onChange={(e) => setTargetClass(e.target.value)}
          placeholder="e.g., main"
          className="input input-bordered"
        />
      </div>
      <div className="my-4 ">
        <Label className="label">Upload .txt file with URLs:</Label>
        <Input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="input"
        />
        <Button
          variant=""
          onClick={handleFileUpload}
          className="btn btn-primary mt-2"
          disabled={isProcessing} // Disable button during processing
        >
          Process File and Create PDFs
        </Button>
      </div>
      {/* Render Progress Bar */}
      {isProcessing && (
        <div className="my-4">
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2">{Math.round(progress)}% completed</p>
        </div>
      )}
    </div>
  )
}

export default DashboardPDFCreator
