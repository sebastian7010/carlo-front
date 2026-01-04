"use client"

import type React from "react"
import { AuthProvider } from "@/lib/auth"

export default function SanctumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
