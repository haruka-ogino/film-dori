import { turso } from '@/utils/database'

export const createUser = async (userData: {
  sub: string
  email: string
  username: string
  image: string
  given_name: string
  family_name: string
}) => {
  const query = `
    INSERT INTO users (id, email, username, image, given_name, family_name)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const args = [
    userData.sub,
    userData.email,
    userData.username,
    userData.image,
    userData.given_name,
    userData.family_name,
  ]

  await turso.execute({ sql: query, args })
}

export const findUserByEmail = async (email: string) => {
  const query = `
    SELECT * FROM users WHERE email = ?
  `
  const result = await turso.execute({ sql: query, args: [email] })
  if (result.rows.length > 0) {
    const [user] = result.rows
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      image: user.image,
    }
  }
  return null
}
