'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, TrendingUp, Users, Zap } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (role: 'user' | 'admin') => {
    setIsLoading(true)
    
    // Simulate authentication
    const user = {
      id: role === 'admin' ? 'admin-1' : 'user-1',
      name: role === 'admin' ? 'Admin User' : 'Sales Rep',
      email: role === 'admin' ? 'admin@truleadai.com' : 'sales@company.com',
      role: role,
      dailyQuota: 100,
      usedQuota: 0,
      lastReset: new Date().toDateString()
    }
    
    localStorage.setItem('truleadai_user', JSON.stringify(user))
    
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-[#4285F4] rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#1565C0]">TruLeadAI</h1>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
            Revolutionize B2B Lead Generation with AI
          </h2>
          
          <p className="text-lg text-gray-600 max-w-lg">
            Discover high-quality prospects with AI-powered insights, reduce manual prospecting time by 70%, and enhance lead quality through intelligent filtering.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-6 w-6 text-[#4285F4]" />
              <div>
                <div className="font-semibold text-gray-800">100+ Leads</div>
                <div className="text-sm text-gray-600">Daily Discovery</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <Zap className="h-6 w-6 text-[#8E44AD]" />
              <div>
                <div className="font-semibold text-gray-800">AI Insights</div>
                <div className="text-sm text-gray-600">Powered Analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <Users className="h-6 w-6 text-[#4285F4]" />
              <div>
                <div className="font-semibold text-gray-800">Smart Filtering</div>
                <div className="text-sm text-gray-600">Precise Targeting</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
              <CardDescription>
                Choose your role to access the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="user" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">Sales Rep</TabsTrigger>
                  <TabsTrigger value="admin">Administrator</TabsTrigger>
                </TabsList>
                
                <TabsContent value="user" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input 
                      id="user-email" 
                      type="email" 
                      placeholder="sales@company.com"
                      defaultValue="sales@company.com"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input 
                      id="user-password" 
                      type="password" 
                      placeholder="••••••••"
                      defaultValue="password"
                      disabled
                    />
                  </div>
                  <Button 
                    className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white" 
                    onClick={() => handleLogin('user')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in as Sales Rep'}
                  </Button>
                  <p className="text-sm text-gray-600 text-center">
                    Access lead discovery, management, and personal analytics
                  </p>
                </TabsContent>
                
                <TabsContent value="admin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input 
                      id="admin-email" 
                      type="email" 
                      placeholder="admin@truleadai.com"
                      defaultValue="admin@truleadai.com"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input 
                      id="admin-password" 
                      type="password" 
                      placeholder="••••••••"
                      defaultValue="password"
                      disabled
                    />
                  </div>
                  <Button 
                    className="w-full bg-[#8E44AD] hover:bg-[#7D3C98] text-white" 
                    onClick={() => handleLogin('admin')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in as Administrator'}
                  </Button>
                  <p className="text-sm text-gray-600 text-center">
                    Full platform oversight, request management, and system analytics
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-500">
                  Demo Mode - Choose either role to explore the platform
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}