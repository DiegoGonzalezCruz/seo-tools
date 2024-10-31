import Aside from '@/components/Layout/Aside'

import { auth } from '@/auth'

export const metadata = {
  title: 'Automatic Tagger',
  description: 'Tags images automatically',
}

export default async function DashboardLayout({ children }) {
  const session = await auth()

  return (
    <div className="flex ">
      <Aside />
      <main className="flex-1 p-5">{children}</main>
    </div>
  )
}
