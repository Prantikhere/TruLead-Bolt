'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard'

export default function AnalyticsPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('truleadai_user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))
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
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Reporting</h1>
          <p className="text-gray-600 mt-1">
            Track your performance, analyze trends, and optimize your lead generation
          </p>
        </div>

        <AnalyticsDashboard user={user} />
      </div>
    </DashboardLayout>
  )
}