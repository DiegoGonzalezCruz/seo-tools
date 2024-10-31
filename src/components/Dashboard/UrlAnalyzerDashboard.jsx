'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '../ui/label'

export default function UrlAnalyzerDashboard() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')

  const extractLinks = async () => {
    setIsLoading(true)
    setError(null)
    setLinks([])
    setFilter('')

    try {
      const response = await fetch(`/api/fetch-links/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      if (!response.ok) {
        throw new Error('Failed to fetch or parse the URL.')
      }

      const data = await response.json()
      setLinks(data.links)
    } catch (err) {
      setError(
        'Failed to fetch or parse the URL. Make sure the URL is correct and accessible.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const getFilteredLinks = () => {
    if (!filter) return links // Return all links if no filter is applied
    return links.filter((link) =>
      link.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  const downloadTxtFile = () => {
    const filteredLinks = getFilteredLinks()
    const content = filteredLinks.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'extracted-links.txt'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Link Extractor</h1>
      <p className="text-secondary">
        Extract all the hrefs present in a webpage when providing the URL. A txt
        file can be generated with the extracted links.
      </p>
      <div className="flex space-x-2">
        <Input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={extractLinks} disabled={isLoading || !url}>
          {isLoading ? 'Extracting...' : 'Extract Links'}
        </Button>
      </div>

      {links.length > 0 && (
        <div className=" flex flex-col gap-5">
          <div className="mt-4">
            <Label className="label">Filter Links</Label>
            <Input
              type="text"
              placeholder="Filter links"
              value={filter}
              onChange={handleFilterChange}
              className="flex-grow"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Extracted Links:</h2>
          <ul className="list-disc pl-5 space-y-1">
            {getFilteredLinks().map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <Button onClick={downloadTxtFile} className="w-full my-4">
            Download Links as .txt
          </Button>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
