import NextAuth, { Session, DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createUser, findUserByEmail } from '@/models/user'

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string | null
    } & DefaultSession['user']
  }

  interface Profile {
    picture?: string | null
    given_name: string
    family_name: string
    sub?: string | undefined
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }): Promise<Session> {
      if (session.user && session.user.email) {
        const sessionUser = await findUserByEmail(session.user.email)
        if (sessionUser && sessionUser.id) {
          session.user.id = sessionUser.id.toString()
        }
      }

      return session
    },
    async signIn({ profile }) {
      try {
        console.log(profile)

        if (!profile || !profile.email) {
          return false
        }

        // Check if user exists
        const userExists = await findUserByEmail(profile.email)

        // Create user if it does not exist
        if (!userExists) {
          await createUser({
            given_name: profile.given_name,
            family_name: profile.family_name,
            email: profile.email,
            username: profile.name
              ? profile.name.replace(' ', '').toLowerCase()
              : '',
            image: profile.picture ?? '',
            sub: profile.sub as string,
          })
        }
        return true
      } catch (error) {
        console.log('Error:', error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
