'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/hooks/useProviders'

const NavBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const { session, providers, signIn, signOut, isLoading, isError } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading providers</div>

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sm:flex justify-around items-center hidden overflow-x-hidden py-2 my-2 border-y-2 border-blue-900">
        <Link href="/" className="mx-2 my-8">
          Discover
        </Link>
        <Link href="/post-location" className="mx-2 my-8">
          Add Location
        </Link>
        {session?.user && (
          <Link href="/my-locations" className="mx-2 my-8">
            My Locations
          </Link>
        )}
        <Link href="/about" className="mx-2 my-8">
          About
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 mx-2 my-8">
            <button type="button" className="log-btn" onClick={() => signOut()}>
              Sign Out
            </button>

            <Image
              src={session?.user.image ?? ''}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="log-btn"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id)
                  }}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed right-0 top-0 transform-translate-x-1/2 py-1 z-10 overflow-hidden gradient m-2">
        {/* <nav className="sm:hidden fixed right-0 mr-16 top-0 flex justify-around transform -translate-x-1/2 py-1 bg-[#f4fbfe] w-[70%] z-10 box-border overflow-hidden"> */}
        {!toggleDropdown ? (
          <div
            className="relative w-16 pt-1"
            id=""
            onClick={() => setToggleDropdown(true)}
          >
            <button className="leading-5 py-2 rounded">
              <h5>━</h5>
              <h5>━</h5>
              <h5>━</h5>
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-around w-[30rem] h-[40rem] text-5xl">
            <button
              className="fixed top-10 right-5 w-16 pt-2"
              id=""
              onClick={() => setToggleDropdown(false)}
            >
              {/* <h5 className="fixed top-10 leading-3 right-4 text-8xl">x</h5> */}
              <h5 className="leading-3 text-8xl">x</h5>
            </button>
            <Link href="/" className="mx-2 my-8">
              Discover
            </Link>
            <Link href="/post-location" className="mx-2 my-8">
              Add Location
            </Link>
            {session?.user && (
              <Link href="/my-locations" className="mx-2 my-8">
                My Locations
              </Link>
            )}
            <Link href="/about" className="mx-2 my-8">
              About
            </Link>
            {session?.user ? (
              <div className="flex gap-3 md:gap-5 mx-2 my-8">
                <button
                  type="button"
                  className="log-btn"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>

                <Image
                  src={session?.user.image ?? ''}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </div>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      className="log-btn my-8"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id)
                      }}
                    >
                      Sign in
                    </button>
                  ))}
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default NavBar
