import { Inter } from 'next/font/google'
import './globals.css'
import ClientProvider from './ClientProvider'
import Aside from '@/components/Layout/Aside'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Automatic Tagger',
  description: 'Tags images automatically',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ClientProvider>
          <div className="flex ">
            {/* <Aside /> */}
            <main className="flex-1 p-5">{children}</main>
          </div>
        </ClientProvider>
      </body>
    </html>
  )
}
