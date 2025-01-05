'use client'

// hooks/useUserData.js
import { useQuery } from '@tanstack/react-query'
import { fetchUserData } from '@/lib/users'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const useUserData = () => {
  const { data: session, status } = useSession()

  const query = useQuery({
    queryKey: ['user', session?.user?.id],
    queryFn: fetchUserData,
    enabled: status === 'authenticated',
    onSuccess: (data) => {
      toast.success('User data fetched successfully')
    },
  })

  return { ...query, session }
}

export default useUserData
