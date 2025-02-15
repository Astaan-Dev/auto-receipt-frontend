import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { AppBar } from './components/AppBar'
import { Suspense } from 'react'
import { Loading } from './components/Loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auto Receipt - Customer Care Dashboard',
  description: 'Multi-feature customer care system',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased h-full bg-white`}>
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <AppBar />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}



import './globals.css'