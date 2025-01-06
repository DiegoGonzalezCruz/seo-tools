// import { auth } from '@/auth'

import PagesDashboard from "@/components/Pages/PagesDashboard";

export default async function AltTaggerPage() {
  // const session = await auth()
  // console.log(session, 'session')

  return (
    <main className="container flex s h-full w-full  flex-col items-center justify-start ">
      <PagesDashboard />
    </main>
  );
}
