import { NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'
import { ZodError, z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = signupSchema.parse(body)

    const user = await createUser(email, password)
    return NextResponse.json({ user })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Could not create user' },
      { status: 500 }
    )
  }
}