// hooks/useMediaData.js

import useUserData from './useUserData'
import { getMediaByPage } from '../wordpress'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useMediaData = (currentPage) => {
  const { data: userData, session, status, isSuccess } = useUserData()
  // console.log(currentPage, 'currentPage from hook ************')

  //   console.log(userData, 'userData from hook ************')
  //   console.log(status, typeof status, 'status from hook ************')
  //   console.log(session, 'session from hook ************')
  const query = useQuery({
    queryKey: ['media', currentPage],
    queryFn: () => getMediaByPage(currentPage, 50, userData),
    enabled: !!isSuccess && !!userData,
  })
  //   console.log(query, 'query ************')
  return { ...query, userData }
}

export default useMediaData
