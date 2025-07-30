"use client"

import Link from "next/link"
import { UserForm } from "../components/user-form"
import { UserList } from "../components/user-list"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              <Link target="_blank" href="https://github.com/erickgcastro">
                github/erickgcastro
              </Link>
            </h1>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <UserForm />
          </section>

          <Separator />

          <section>
            <UserList />
          </section>
        </div>
      </div>
    </div>
  )
}
