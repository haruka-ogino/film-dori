import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import { Single_Day } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const singleDay_init = Single_Day({
  // subsets:['latin'],
  weight: ['400'],
  variable: '--font-single_day',
})
export const metadata: Metadata = {
  title: 'All the Ghibli Things!',
  description: 'A library for all Ghibli things',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${singleDay_init.variable} single_day`}
      >
        <header className="flex justify-between items-center overflow-x-hidden">
          <h1>All the Ghibli Things!</h1>
          <Link href="/">
            {/* img needs alt text despite being decorative as it is providing functionality (link to home page) */}
            <img
              src="https://www.ghibli-museum.jp/en/img/mainimg.png"
              alt="link to home page"
            />
          </Link>
        </header>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
