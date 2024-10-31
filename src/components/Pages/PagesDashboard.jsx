'use client'

import useGetPages from '@/lib/hooks/useGetPages'
import useUserData from '@/lib/hooks/useUserData'
import PagesListing from './PagesListing'
import Paginator from '../Pagination/Paginator'
import { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import { searchInPagesWithSlug } from '@/lib/wordpress'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'

const PagesDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchSlug, setSearchSlug] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  const { data: userData, isSuccess, isLoading } = useUserData()

  const {
    data: pages,
    isSuccess: isSuccessPages,
    isLoading: isLoadingPages,
  } = useGetPages(currentPage, 20)

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)) // Ensure page doesn't go below 1
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1) // Increment page
  }

  const handleSearch = async () => {
    if (!searchSlug) return

    const result = await searchInPagesWithSlug(searchSlug, userData)
    setSearchResult(result)
  }

  console.log(pages, 'pages ✅')

  // console.log(userData, 'userData')
  useEffect(() => {
    const searchPages = async () => {
      if (searchSlug) {
        const result = await searchInPagesWithSlug(searchSlug, userData)
        setSearchResult(result)
      } else {
        setSearchResult(null)
      }
    }

    const debounceSearch = setTimeout(() => {
      searchPages()
    }, 300) // Delay search by 300ms

    return () => clearTimeout(debounceSearch) // Clear timeout if input changes
  }, [searchSlug, userData])

  // console.log(pages, 'pages')
  if (isLoading || isLoadingPages) return <Loading />
  if (isSuccess && isSuccessPages)
    return (
      <div className="flex flex-col gap-10">
        <h1>Page Management & Image Optimization</h1>
        <p>
          Welcome to the Pages Dashboard! Here, you can effortlessly manage your
          pages and optimize your images. Start by searching for a page using
          its slug or browse through the list of pages using the navigation
          buttons. Once you select a page, all the images associated with it
          will be displayed. From there, you can choose any image and convert it
          to the efficient WebP format with a single click. This feature helps
          optimize your images for better performance and faster loading times.
          Get started by searching or navigating through your pages!
        </p>
        <Card className="w-full ">
          <CardHeader className=" flex flex-row gap-5 items-center justify-center">
            <Input
              type="text"
              value={searchSlug}
              onChange={(e) => setSearchSlug(e.target.value)}
              placeholder="Search by slug"
              className=""
            />
            <Button onClick={handleSearch} className="">
              Search
            </Button>
          </CardHeader>
          <CardContent className="">
            {searchResult ? (
              <PagesListing pages={searchResult} />
            ) : (
              <>
                <PagesListing pages={pages.data} />
                <Paginator
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                  currentPage={currentPage}
                  totalPages={pages?.totalPages}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
}

export default PagesDashboard
