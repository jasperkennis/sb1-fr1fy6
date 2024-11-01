"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h2 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h2>
        <p className="mb-4 text-gray-600">
          {error === "AccessDenied" && "You do not have permission to sign in."}
          {error === "Verification" && "The verification link is invalid or has expired."}
          {!error && "An unknown error occurred during authentication."}
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/signin">Try Again</Link>
        </Button>
      </Card>
    </div>
  )
}