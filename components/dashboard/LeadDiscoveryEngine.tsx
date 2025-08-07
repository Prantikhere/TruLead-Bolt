'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Filter, 
  Sparkles, 
  MapPin, 
  Building2, 
  Calendar,
  Eye,
  Star,
  RefreshCw
} from 'lucide-react'
import { generateLeadBatch } from '@/lib/leadGenerator'
import LeadCard from '@/components/dashboard/LeadCard'

interface User {
  id: string
  dailyQuota: number
  usedQuota: number
}

interface LeadDiscoveryEngineProps {
  user: User
  setUser: (user: User) => void
}

interface FilterOptions {
  continent: string
  country: string
  region: string
  city: string
  industry: string
}

export default function LeadDiscoveryEngine({ user, setUser }: LeadDiscoveryEngineProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    continent: '',
    country: '',
    region: '',
    city: '',
    industry: ''
  })
  
  const [discoveredLeads, setDiscoveredLeads] = useState<any[]>([])
  const [isDiscovering, setIsDiscovering] = useState(false)
  const [showLeads, setShowLeads] = useState(false)

  const continents = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
  const countries = {
    'North America': ['United States', 'Canada', 'Mexico'],
    'Europe': ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy'],
    'Asia': ['Japan', 'China', 'India', 'Singapore', 'South Korea'],
    'South America': ['Brazil', 'Argentina', 'Chile'],
    'Africa': ['South Africa', 'Nigeria', 'Kenya'],
    'Oceania': ['Australia', 'New Zealand']
  }
  
  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Education', 'Real Estate', 'Consulting', 'Marketing', 'Legal'
  ]

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      
      // Reset dependent filters when parent changes
      if (key === 'continent') {
        newFilters.country = ''
        newFilters.region = ''
        newFilters.city = ''
      } else if (key === 'country') {
        newFilters.region = ''
        newFilters.city = ''
      } else if (key === 'region') {
        newFilters.city = ''
      }
      
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      continent: '',
      country: '',
      region: '',
      city: '',
      industry: ''
    })
  }

  const discoverLeads = async () => {
    if (user.usedQuota >= user.dailyQuota) {
      return
    }

    setIsDiscovering(true)
    setShowLeads(false)

    // Simulate AI discovery process
    await new Promise(resolve => setTimeout(resolve, 2000))

    const batchSize = Math.min(8, user.dailyQuota - user.usedQuota)
    const newLeads = generateLeadBatch(batchSize, filters)
    
    setDiscoveredLeads(newLeads)
    setShowLeads(true)

    // Update user quota
    const updatedUser = {
      ...user,
      usedQuota: user.usedQuota + batchSize
    }
    setUser(updatedUser)
    localStorage.setItem('truleadai_user', JSON.stringify(updatedUser))

    // Save leads to localStorage
    const existingLeads = JSON.parse(localStorage.getItem('truleadai_leads') || '[]')
    const updatedLeads = [...existingLeads, ...newLeads]
    localStorage.setItem('truleadai_leads', JSON.stringify(updatedLeads))

    setIsDiscovering(false)
  }

  const remainingQuota = user.dailyQuota - user.usedQuota
  const quotaPercentage = (user.usedQuota / user.dailyQuota) * 100

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#4285F4] rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-800">Lead Discovery Engine</CardTitle>
              <CardDescription>Unearth high-potential prospects with AI-powered discovery</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-[#4285F4] border-[#4285F4]">
            {remainingQuota} leads remaining
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Daily Discovery Progress</span>
            <span>{user.usedQuota}/{user.dailyQuota}</span>
          </div>
          <Progress value={quotaPercentage} className="h-2" />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#4285F4]" />
              <label className="text-sm font-medium">Continent</label>
            </div>
            <Select value={filters.continent} onValueChange={(value) => handleFilterChange('continent', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((continent) => (
                  <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filters.continent && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries[filters.continent as keyof typeof countries]?.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#8E44AD]" />
              <label className="text-sm font-medium">Industry</label>
            </div>
            <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Discovery Button */}
        <div className="text-center">
          <Button
            onClick={discoverLeads}
            disabled={isDiscovering || remainingQuota <= 0}
            className="bg-gradient-to-r from-[#4285F4] to-[#8E44AD] hover:from-[#3367D6] hover:to-[#7D3C98] text-white px-8 py-3 text-lg font-medium"
          >
            {isDiscovering ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                Discovering Leads...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Unearth Leads
              </>
            )}
          </Button>
          
          {remainingQuota <= 0 && (
            <p className="text-sm text-red-600 mt-2">
              Daily quota reached. Quota resets tomorrow.
            </p>
          )}
        </div>

        {/* Discovered Leads */}
        {showLeads && discoveredLeads.length > 0 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#4285F4]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Discovered {discoveredLeads.length} High-Potential Leads
              </h3>
            </div>
            
            <div className="grid gap-4">
              {discoveredLeads.map((lead, index) => (
                <div key={lead.id} className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                  <LeadCard lead={lead} />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}