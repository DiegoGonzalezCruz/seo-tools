import { auth } from '@/auth'
import PageContent from '@/components/Pages/PageContent'
import prisma from '@/lib/prisma'
import { getPageMediaBySlug } from '@/lib/wordpress'

const PageSlug = async ({ params }) => {
  //   console.log(params.pageSlug, 'params')
  const session = await auth()
  // console.log(session, 'user')
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: { wordpressInstances: true },
  })
  // console.log(userData, 'userData')
  const page = await getPageMediaBySlug(params.pageSlug, userData)
  // console.log(page, 'page &&&&***')

  return (
    <div className=" h-full w-full">
      <PageContent page={page} />
    </div>
  )
}

export default PageSlug
