'use client'
import useUserData from '@/lib/hooks/useUserData'
import { useParams } from 'next/navigation'
import MediaListings from '@/components/Media/MediaListings'

const PageContent = ({ page }) => {
  return <MediaListings media={page.mediaFiles} page={page} />
}

export default PageContent
