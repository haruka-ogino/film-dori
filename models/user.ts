import { turso } from '@/utils/database'

export const createUser = async (userData: {
  email: string
  username: string
  image: string
}) => {
  const query = `
    INSERT INTO users (email, username, image)
    VALUES (?, ?, ?)
  `

  const args = [userData.email, userData.username, userData.image]

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
