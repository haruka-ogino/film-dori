import { createClient } from '@libsql/client'

// Initialise the Turso client
const tursoDatabaseUrl = process.env.TURSO_DATABASE_URL as string
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN as string

// Initialise the Turso client
export const turso = createClient({
  url: tursoDatabaseUrl,
  authToken: tursoAuthToken,
})
