'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import LeadManagement from '@/components/dashboard/LeadManagement'

export default function LeadsPage() {
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
          <h1 className="text-3xl font-bold text-gray-800">Lead Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your discovered leads, update statuses, and track your pipeline
          </p>
        </div>

        <LeadManagement />
      </div>
    </DashboardLayout>
  )
}