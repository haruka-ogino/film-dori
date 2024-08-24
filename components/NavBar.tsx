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
        <Link href="/" className="mx-2 my-2">
          Discover
        </Link>
        <Link href="/post-location" className="mx-2 my-2">
          Add Location
        </Link>
        {session?.user && (
          <Link href="/my-locations" className="mx-2 my-2">
            My Locations
          </Link>
        )}
        <Link href="/about" className="mx-2 my-2">
          About
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 mx-2 my-2">
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
                  className="log-btn mx-2 my-2"
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
      <nav className="sm:hidden text-right fixed right-2 top-2 transform-translate-x-1/2 z-12 overflow-hidden">
        {/* <nav className="sm:hidden fixed right-0 mr-16 top-0 flex justify-around transform -translate-x-1/2 py-1 bg-[#f4fbfe] w-[70%] z-10 box-border overflow-hidden"> */}
        {!toggleDropdown ? (
          <div
            className="relative w-16 h-[70px] pt-1 flex flex-col justify-around gradient"
            id=""
            onClick={() => setToggleDropdown(true)}
          >
            <button className="py-0 leading-4 text-4xl">
              <h5 className="py-0">━</h5>
              <h5 className="py-0">━</h5>
              <h5 className="py-0">━</h5>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-around w-80 h-94 text-4xl gradient">
            <button
              className="fixed top-8 right-5 pt-2"
              id=""
              onClick={() => setToggleDropdown(false)}
            >
              {/* <h5 className="fixed top-10 leading-3 right-4 text-8xl">x</h5> */}
              <h5 className="leading-3 text-8xl">x</h5>
            </button>
            <Link
              href="/"
              className="mx-2 my-8"
              onClick={() => setToggleDropdown(false)}
            >
              Discover
            </Link>
            <Link
              href="/post-location"
              className="mx-2 my-8"
              onClick={() => setToggleDropdown(true)}
            >
              Add Location
            </Link>
            {session?.user && (
              <Link
                href="/my-locations"
                className="mx-2 my-8"
                onClick={() => setToggleDropdown(false)}
              >
                My Locations
              </Link>
            )}
            <Link
              href="/about"
              className="mx-2 my-8"
              onClick={() => setToggleDropdown(false)}
            >
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
