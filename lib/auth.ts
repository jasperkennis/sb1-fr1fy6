import { hash, compare } from 'bcryptjs'
import { prisma } from './prisma'

export async function createUser(email: string, password: string) {
  const hashedPassword = await hash(password, 12)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return { id: user.id, email: user.email }
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return null
  }

  const isValid = await compare(password, user.password)

  if (!isValid) {
    return null
  }

  return { id: user.id, email: user.email }
}