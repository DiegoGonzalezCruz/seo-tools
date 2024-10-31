'use client'

// hooks/useUserData.js

import toast from 'react-hot-toast'
import useUserData from './useUserData'
import { getPages } from '../wordpress'
import { useQuery } from '@tanstack/react-query'

const useGetPages = (currentPage = 1, perPage = 10) => {
  const { data: userData, isSuccess } = useUserData()

  const query = useQuery({
    queryKey: ['pages', currentPage, userData],
    queryFn: () => getPages(currentPage, perPage, userData),
    enabled: isSuccess,
    onSuccess: (data) => {
      console.log('onSuccess:', data)
      toast.success('User data fetched successfully')
    },
    onError: (error) => {
      console.error('Error fetching pages:', error)
      toast.error('Error fetching pages')
    },
  })
  // console.log(query.data, 'query')

  return { ...query }
}

export default useGetPages
