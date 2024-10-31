'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

const InputImageURL = ({ userData, onSubmit, buttonLabel = 'Submit' }) => {
  const [urlInput, setUrlInput] = useState('')
  const [conversionStatus, setConversionStatus] = useState('')

  const handleUrlSubmit = async () => {
    try {
      toast.loading('Processing...')
      if (!urlInput.trim()) {
        toast.error('Please enter a valid URL.')
        throw new Error('Please enter a valid URL.')
      }

      // Call the passed function
      const result = await onSubmit(urlInput, userData)

      toast.dismiss() // Dismiss the loading toast
      if (result.success) {
        setConversionStatus(`Operation successful: ${result.message}`)
        toast.success('Operation successful.')
      } else {
        setConversionStatus('Operation failed.')
        toast.error('Operation failed.')
      }
    } catch (error) {
      toast.dismiss() // Ensure the toast is dismissed on error
      console.error('Error:', error)
      setConversionStatus('Error during operation.')
      toast.error('Error during operation.')
    }
  }

  return (
    <div className="w-5/6 h-full flex flex-col items-center justify-center gap-10">
      <label className="input input-bordered flex items-center gap-2 w-full">
        <Input
          type="text"
          placeholder="Enter URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="w-full input"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <Button variant="" className="" onClick={handleUrlSubmit}>
        {buttonLabel}
      </Button>

      {conversionStatus && <p>{conversionStatus}</p>}
    </div>
  )
}

export default InputImageURL
