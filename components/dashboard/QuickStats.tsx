'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Target, 
  TrendingUp, 
  Users, 
  Brain,
  Clock,
  CheckCircle2
} from 'lucide-react'

interface User {
  dailyQuota: number
  usedQuota: number
  role: string
}

interface QuickStatsProps {
  user: User
}

export default function QuickStats({ user }: QuickStatsProps) {
  const quotaPercentage = (user.usedQuota / user.dailyQuota) * 100
  const remainingQuota = user.dailyQuota - user.usedQuota

  // Simulated stats - in a real app, these would come from the database
  const stats = [
    {
      title: 'Daily Quota',
      value: `${user.usedQuota}/${user.dailyQuota}`,
      description: `${remainingQuota} leads remaining today`,
      icon: Target,
      color: 'text-[#4285F4]',
      bgColor: 'bg-blue-50',
      progress: quotaPercentage
    },
    {
      title: 'This Week',
      value: '342',
      description: 'Leads discovered this week',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'High Potential',
      value: '28',
      description: 'Qualified prospects',
      icon: Users,
      color: 'text-[#8E44AD]',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'AI Insights',
      value: '156',
      description: 'Generated this week',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  if (user.role === 'admin') {
    stats.push(
      {
        title: 'Active Users',
        value: '24',
        description: 'Team members online',
        icon: Clock,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50'
      },
      {
        title: 'Requests',
        value: '7',
        description: 'Pending approval',
        icon: CheckCircle2,
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      }
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <CardDescription className="text-xs">
                {stat.description}
              </CardDescription>
              {stat.progress !== undefined && (
                <div className="mt-3">
                  <Progress 
                    value={stat.progress} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(stat.progress)}% of daily quota used
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}