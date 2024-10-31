'use client'
import { useState } from 'react'

import Paginator from '../Pagination/Paginator'
import MediaList from '../Images/MediaList'

import useUserData from '@/lib/hooks/useUserData'
import useMediaData from '@/lib/hooks/useMediaData'

const MediaDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingPage, setIsLoadingPage] = useState(false) // Loading state for page transitions

  const {
    data: userData,
    isSuccess: isSuccessUser,
    isLoading: isLoadingUser,
  } = useUserData()

  const {
    data: mediaData,
    isSuccess: isSuccessMedia,
    isLoading: isLoadingMedia,
  } = useMediaData(currentPage)

  const handlePrev = () => {
    if (currentPage > 1) {
      setIsLoadingPage(true) // Set loading state
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < mediaData?.totalPages) {
      setIsLoadingPage(true) // Set loading state
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setIsLoadingPage(true) // Set loading state
      setCurrentPage(page)
    }
  }

  // Remove the loading state after mediaData loads
  if (!isLoadingMedia && isLoadingPage) {
    setIsLoadingPage(false)
  }

  if (isLoadingUser) return <div>Loading page data...</div>

  if (isSuccessUser && mediaData) {
    return (
      <div className="flex-1">
        <Paginator
          handlePrev={handlePrev}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          totalPages={mediaData?.totalPages}
        />
        {/* Show loading overlay while fetching new page */}
        {isLoadingPage && (
          <div className="loading-overlay">Loading new page...</div>
        )}
        <MediaList media={mediaData} />
        <Paginator
          handlePrev={handlePrev}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          totalPages={mediaData?.totalPages}
        />
      </div>
    )
  }
}

export default MediaDashboard
