'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Brain, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  Home,
  UserCheck,
  MessageSquare
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('truleadai_user')
      return userData ? JSON.parse(userData) : null
    }
    return null
  })
  
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('truleadai_user')
    localStorage.removeItem('truleadai_leads')
    localStorage.removeItem('truleadai_requests')
    router.push('/auth/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Lead Management', href: '/dashboard/leads', icon: UserCheck },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ...(user?.role === 'admin' ? [
      { name: 'Requests', href: '/dashboard/requests', icon: MessageSquare },
      { name: 'Team Management', href: '/dashboard/team', icon: Users }
    ] : []),
  ]

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#4285F4] rounded-lg">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-[#1565C0]">TruLeadAI</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                isActive 
                  ? 'bg-[#4285F4] text-white hover:bg-[#3367D6]' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => router.push(item.href)}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Button>
          )
        })}
      </nav>
      
      <div className="border-t pt-4 space-y-2">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-800">{user?.name}</div>
          <div className="text-sm text-gray-600">{user?.email}</div>
          <div className="text-xs text-gray-500 mt-1">
            {user?.role === 'admin' ? 'Administrator' : 'Sales Representative'}
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100"
          onClick={() => {/* Settings functionality */}}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#E3F2FD]">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet>
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4285F4] rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-[#1565C0]">TruLeadAI</h1>
            </div>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}