"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">
          {error === "Configuration" && "There is a problem with the server configuration."}
          {error === "AccessDenied" && "You do not have permission to sign in."}
          {error === "Verification" && "The verification link is invalid or has expired."}
          {!error && "An unknown error occurred."}
        </p>
        <Button asChild className="mt-4">
          <Link href="/auth/signin">
            Try Again
          </Link>
        </Button>
      </div>
    </div>
  )
}