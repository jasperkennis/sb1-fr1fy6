"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dit is wel echt goud gek!</h1>
          <Button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            variant="outline"
          >
            Sign Out
          </Button>
        </div>
        <div className="mt-6">
          <p className="text-lg text-gray-600">
            Welcome, {session?.user?.name || session?.user?.email}!
          </p>
        </div>
      </div>
    </div>
  )
}