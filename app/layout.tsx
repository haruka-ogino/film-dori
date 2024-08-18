import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import { Single_Day } from 'next/font/google'
import Link from 'next/link'
import Provider from '@/components/Provider'
import { SessionProviderProps } from 'next-auth/react'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import Footer from '@/components/Footer'

const singleDay_init = Single_Day({
  weight: ['400'],
  variable: '--font-single_day',
})
export const metadata: Metadata = {
  title: 'Film Dori',
  description: 'The place to share your favourite places!',
}

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session?: SessionProviderProps['session']
}>) {
  return (
    <html lang="en">
      <Provider session={session}>
        <ReactQueryProvider>
          <head>
            <link rel="icon" href="/favicon.png" />
          </head>
          <body
            className={`${singleDay_init.variable} single_day min-h-screen`}
          >
            <header className="flex justify-between items-center overflow-hidden h-60">
              {/* <h1 className="text-8xl">Film Michi!</h1> */}
              <h1 className="text-8xl">FILM DORI</h1>
              <Link href="/">
                {/* img needs alt text despite being decorative as it is providing functionality (link to home page) */}
                <img
                  className="h-60"
                  src="/film-dori-grey.png"
                  alt="link to home page"
                />
              </Link>
            </header>
            <NavBar />
            <main className="flex min-h-[55%] flex-col items-center">
              {children}
            </main>
            <Footer />
          </body>
        </ReactQueryProvider>
      </Provider>
    </html>
  )
}
