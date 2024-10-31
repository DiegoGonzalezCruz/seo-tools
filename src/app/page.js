import Login from '@/components/Login/Login'

export const metadata = {
  title: 'SEO Tools',
}

export default async function Home() {
  // console.log(session, 'session')
  if (true) {
    return (
      <main className="flex min-h-screen h-full w-full  flex-col items-center justify-center ">
        Hello there
      </main>
    )
  } else {
    return (
      <main className="flex min-h-screen h-full w-full  flex-col items-center justify-center ">
        <Login />
      </main>
    )
  }
}
