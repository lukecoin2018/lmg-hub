'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
      <div className="text-white text-xl">Redirecting...</div>
    </div>
  )
}
