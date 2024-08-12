import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import { Single_Day } from 'next/font/google'
import Link from 'next/link'
import Provider from '@/components/Provider'
import { SessionProviderProps } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactQueryProvider from '@/components/ReactQueryProvider'

const singleDay_init = Single_Day({
  weight: ['400'],
  variable: '--font-single_day',
})
export const metadata: Metadata = {
  title: 'All the Ghibli Things!',
  description: 'A library for all Ghibli things',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session: SessionProviderProps['session']
}>) {
  return (
    <html lang="en">
      <body className={`${singleDay_init.variable} single_day`}>
        <Provider session={session}>
          <ReactQueryProvider>
            <header className="flex justify-between items-center overflow-x-hidden">
              <h1 className="text-5xl">All the Ghibli Things!</h1>
              <Link href="/">
                {/* img needs alt text despite being decorative as it is providing functionality (link to home page) */}
                <img
                  className="w-48"
                  src="https://www.ghibli-museum.jp/en/img/mainimg.png"
                  alt="link to home page"
                />
              </Link>
            </header>
            <NavBar />
            {children}
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  )
}
