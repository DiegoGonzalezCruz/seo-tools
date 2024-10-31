'use client'

import toast from 'react-hot-toast'
import { getCPTs } from '../wordpress'
import { useQuery } from '@tanstack/react-query'
import useUserData from './useUserData'

const useGetCPTs = () => {
  const { data: userData, isSuccess, isLoading } = useUserData()
  //   console.log(userData, 'userData')
  const query = useQuery({
    queryKey: ['cpts', userData],
    queryFn: () => getCPTs(userData),
    enabled: !!isSuccess,
    onSuccess: (data) => {
      console.log('onSuccess:', data)
      toast.success('CPT data fetched successfully')
    },
    onError: (error) => {
      console.error('Error fetching pages:', error)
      toast.error('Error fetching pages')
    },
  })
  // console.log(query, 'query data')
  return { ...query }
}

export default useGetCPTs
