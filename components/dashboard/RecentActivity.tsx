'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  UserPlus, 
  MessageSquare, 
  Star, 
  Eye,
  Calendar
} from 'lucide-react'

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'lead_discovered',
      description: 'TechFlow Solutions discovered',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'status_updated',
      description: 'CloudMaster Inc. marked as High Potential',
      time: '15 minutes ago',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      type: 'note_added',
      description: 'Note added to DataVault Corp.',
      time: '1 hour ago',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      type: 'lead_viewed',
      description: 'Viewed InnovateTech profile',
      time: '2 hours ago',
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'task_created',
      description: 'Follow-up scheduled for NextGen AI',
      time: '3 hours ago',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#4285F4] bg-opacity-10 rounded-lg">
            <Clock className="h-5 w-5 text-[#4285F4]" />
          </div>
          <div>
            <CardTitle className="text-lg text-gray-800">Recent Activity</CardTitle>
            <CardDescription>Your latest lead activities</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div className={`p-2 rounded-lg ${activity.bgColor} mt-0.5`}>
                  <Icon className={`h-3 w-3 ${activity.color}`} />
                </div>
                
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="text-center pt-4 border-t">
          <Button variant="outline" size="sm" className="text-[#4285F4] border-[#4285F4]">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}