'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem('truleadai_user')
    if (!user) {
      router.push('/auth/login')
    } else {
      router.push('/dashboard')
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4285F4]"></div>
      </div>
    )
  }

  return null
}