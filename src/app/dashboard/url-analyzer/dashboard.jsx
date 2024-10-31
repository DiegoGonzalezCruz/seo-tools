'use client'
import { useState } from 'react'
import InputImageURL from '@/components/Dashboard/InputImageURL'
import UrlAnalyzerDashboard from '@/components/Dashboard/UrlAnalyzerDashboard'

const DashboardURLAnalyzer = ({ userData }) => {
  const [className, setClassName] = useState('')
  const [file, setFile] = useState(null)

  return (
    <div>
      <UrlAnalyzerDashboard />
    </div>
  )
}

export default DashboardURLAnalyzer
