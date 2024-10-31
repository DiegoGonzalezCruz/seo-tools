'use client'

import useGetCPTs from '@/lib/hooks/useGetCPTs'

const CustomPostTypesList = () => {
  const cpts = useGetCPTs()
  //   console.log(cpts, 'cpts')
  //   const cpts =  useGetCPTs()
  //   console.log(cpts, 'cpts')
  return <div>CustomPostTypesList</div>
}

export default CustomPostTypesList
