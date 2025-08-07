'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react'

interface AnalyticsDashboardProps {
  user: any
}

export default function AnalyticsDashboard({ user }: AnalyticsDashboardProps) {
  const [leads, setLeads] = useState<any[]>([])

  useEffect(() => {
    const savedLeads = localStorage.getItem('truleadai_leads')
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads))
    }
  }, [])

  // Generate analytics data
  const statusData = [
    { name: 'New', value: leads.filter(l => l.status === 'New').length, color: '#3B82F6' },
    { name: 'High Potential', value: leads.filter(l => l.status === 'High Potential').length, color: '#10B981' },
    { name: 'Follow-up', value: leads.filter(l => l.status === 'Follow-up').length, color: '#F59E0B' },
    { name: 'Not Connected', value: leads.filter(l => l.status === 'Not Connected').length, color: '#6B7280' }
  ]

  const industryData = leads.reduce((acc, lead) => {
    const existing = acc.find(item => item.industry === lead.industry)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ industry: lead.industry, count: 1 })
    }
    return acc
  }, [] as any[])

  const locationData = leads.reduce((acc, lead) => {
    const country = lead.location.country
    const existing = acc.find(item => item.country === country)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ country, count: 1 })
    }
    return acc
  }, [] as any[])

  // Simulated weekly performance data
  const weeklyData = [
    { day: 'Mon', discovered: 12, contacted: 8, responded: 3 },
    { day: 'Tue', discovered: 15, contacted: 11, responded: 5 },
    { day: 'Wed', discovered: 18, contacted: 13, responded: 7 },
    { day: 'Thu', discovered: 14, contacted: 9, responded: 4 },
    { day: 'Fri', discovered: 20, contacted: 15, responded: 8 },
    { day: 'Sat', discovered: 8, contacted: 5, responded: 2 },
    { day: 'Sun', discovered: 5, contacted: 3, responded: 1 }
  ]

  const totalDiscovered = weeklyData.reduce((sum, day) => sum + day.discovered, 0)
  const totalContacted = weeklyData.reduce((sum, day) => sum + day.contacted, 0)
  const totalResponses = weeklyData.reduce((sum, day) => sum + day.responded, 0)
  const responseRate = totalContacted > 0 ? ((totalResponses / totalContacted) * 100).toFixed(1) : '0'

  const avgRelevanceScore = leads.length > 0 
    ? (leads.reduce((sum, lead) => sum + lead.relevanceScore, 0) / leads.length).toFixed(1) 
    : '0'

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-[#4285F4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{leads.length}</div>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
            <Target className="h-4 w-4 text-[#8E44AD]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{responseRate}%</div>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +3.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Relevance</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{avgRelevanceScore}</div>
            <p className="text-xs text-gray-600">Out of 100</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{totalDiscovered}</div>
            <p className="text-xs text-gray-600">Leads discovered</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Lead Status
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Industry
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Geography
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Weekly Performance Trends</CardTitle>
              <CardDescription>Lead discovery, outreach, and response metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="discovered" 
                      stroke="#4285F4" 
                      strokeWidth={2}
                      name="Leads Discovered"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="contacted" 
                      stroke="#8E44AD" 
                      strokeWidth={2}
                      name="Leads Contacted"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="responded" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Responses Received"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Lead Status Distribution</CardTitle>
                <CardDescription>Breakdown of leads by current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Status Summary</CardTitle>
                <CardDescription>Detailed breakdown of lead statuses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{item.value}</div>
                      <div className="text-xs text-gray-600">
                        {leads.length > 0 ? ((item.value / leads.length) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Industry Distribution</CardTitle>
              <CardDescription>Leads breakdown by industry sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#666" />
                    <YAxis dataKey="industry" type="category" width={120} stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#4285F4" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Geographic Distribution</CardTitle>
              <CardDescription>Leads breakdown by country/region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="country" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#8E44AD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Insights Summary */}
      {user.role === 'user' && (
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#4285F4]" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">🎯 Best Performing Industry</h4>
                <p className="text-sm text-gray-600">
                  {industryData.length > 0 
                    ? `${industryData.reduce((max, item) => item.count > max.count ? item : max, industryData[0]).industry} sector shows highest engagement`
                    : 'No data available yet'}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">📈 Growth Opportunity</h4>
                <p className="text-sm text-gray-600">
                  Your response rate is {responseRate}% - consider personalizing outreach messages to improve engagement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}