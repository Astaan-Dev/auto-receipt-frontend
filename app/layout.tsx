import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from "./context/AuthContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auto Receipt',
  description: 'Auto Receipt System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'