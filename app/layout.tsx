import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import { Single_Day } from 'next/font/google'
import Link from 'next/link'
import Provider from '@/components/Provider'
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

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      {/* <head><link rel="icon" href="/favicon.png" /></head> */}
      <body className={`${singleDay_init.variable} single_day min-h-screen`}>
        <ReactQueryProvider>
          <Provider session={undefined}>
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
            <Analytics />
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
