import { auth } from '@/auth'
import ClientWrapper from '@/components/Dashboard/ClientWrapper'
import prisma from '@/lib/prisma'
import DashboardPDFCreator from './dashboard'

const PDFCreator = async () => {
  const session = await auth()
  // console.log(session, 'user')
  const userData = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: { wordpressInstances: true },
  })
  // console.log(userData, 'userData')
  return <DashboardPDFCreator userData={userData} />
}

export default PDFCreator
