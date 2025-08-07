'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import LeadDiscoveryEngine from '@/components/dashboard/LeadDiscoveryEngine'
import QuickStats from '@/components/dashboard/QuickStats'
import RecentActivity from '@/components/dashboard/RecentActivity'
import AIInsights from '@/components/dashboard/AIInsights'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  dailyQuota: number
  usedQuota: number
  lastReset: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('truleadai_user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    
    // Reset daily quota if it's a new day
    const today = new Date().toDateString()
    if (parsedUser.lastReset !== today) {
      parsedUser.usedQuota = 0
      parsedUser.lastReset = today
      localStorage.setItem('truleadai_user', JSON.stringify(parsedUser))
    }
    
    setUser(parsedUser)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4285F4]"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-1">
            {user.role === 'admin' 
              ? 'Manage platform operations and oversee team performance' 
              : 'Discover high-quality leads and grow your pipeline'
            }
          </p>
        </div>

        <QuickStats user={user} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <LeadDiscoveryEngine user={user} setUser={setUser} />
          </div>
          <div className="space-y-6">
            <AIInsights />
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}