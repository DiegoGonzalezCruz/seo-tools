// Adjust path based on your setup

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import DashboardGetImages from './dashboard'

const GetImageByURL = async () => {
  const session = await auth()
  // console.log(session, 'user')
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: { wordpressInstances: true },
  })

  return <DashboardGetImages userData={userData} />
}

export default GetImageByURL
