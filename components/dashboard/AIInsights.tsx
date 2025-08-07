'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, TrendingUp, Target, Lightbulb, RefreshCw } from 'lucide-react'

export default function AIInsights() {
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'trend',
      title: 'Healthcare Leads Trending',
      description: 'Healthcare companies are 40% more responsive this week. Consider increasing focus in this sector.',
      priority: 'high',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'strategy',
      title: 'Optimal Contact Time',
      description: 'Your leads respond best between 2-4 PM on Tuesdays. Schedule outreach accordingly.',
      priority: 'medium',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'High-Value Prospects',
      description: '12 leads in your pipeline match criteria for enterprise deals. Prioritize follow-up.',
      priority: 'high',
      icon: Lightbulb,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshInsights = async () => {
    setIsRefreshing(true)
    
    // Simulate API call to refresh insights
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, this would fetch new insights from the AI service
    const newInsights = [
      {
        id: 4,
        type: 'trend',
        title: 'Technology Sector Growth',
        description: 'Tech companies are expanding hiring by 25%. Good opportunity for HR tech solutions.',
        priority: 'medium',
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 5,
        type: 'strategy',
        title: 'Personalization Impact',
        description: 'Personalized outreach messages show 60% higher response rates than generic ones.',
        priority: 'high',
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      }
    ]
    
    setInsights(newInsights)
    setIsRefreshing(false)
  }

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#4285F4] to-[#8E44AD] rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-800">AI Insights</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshInsights}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon
          return (
            <div
              key={insight.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{insight.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${priorityColors[insight.priority as keyof typeof priorityColors]}`}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          )
        })}
        
        <div className="text-center pt-4">
          <Button variant="outline" size="sm" className="text-[#4285F4] border-[#4285F4]">
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}