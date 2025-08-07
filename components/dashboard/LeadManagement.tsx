'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  Filter,
  Users,
  Star,
  Calendar,
  MessageSquare,
  SortAsc,
  SortDesc
} from 'lucide-react'
import LeadCard from './LeadCard'

export default function LeadManagement() {
  const [leads, setLeads] = useState<any[]>([])
  const [filteredLeads, setFilteredLeads] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('relevanceScore')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    // Load leads from localStorage
    const savedLeads = localStorage.getItem('truleadai_leads')
    if (savedLeads) {
      const parsedLeads = JSON.parse(savedLeads)
      setLeads(parsedLeads)
      setFilteredLeads(parsedLeads)
    }
  }, [])

  useEffect(() => {
    let filtered = [...leads]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter)
    }

    // Apply industry filter
    if (industryFilter !== 'all') {
      filtered = filtered.filter(lead => lead.industry === industryFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'company') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredLeads(filtered)
  }, [leads, searchTerm, statusFilter, industryFilter, sortBy, sortOrder])

  const getStatusCounts = () => {
    return {
      all: leads.length,
      'New': leads.filter(l => l.status === 'New').length,
      'High Potential': leads.filter(l => l.status === 'High Potential').length,
      'Follow-up': leads.filter(l => l.status === 'Follow-up').length,
      'Not Connected': leads.filter(l => l.status === 'Not Connected').length
    }
  }

  const statusCounts = getStatusCounts()
  const industries = [...new Set(leads.map(lead => lead.industry))]

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{leads.length}</div>
                <div className="text-sm text-gray-600">Total Leads</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{statusCounts['High Potential']}</div>
                <div className="text-sm text-gray-600">High Potential</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{statusCounts['Follow-up']}</div>
                <div className="text-sm text-gray-600">Follow-up</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{leads.filter(l => l.notes).length}</div>
                <div className="text-sm text-gray-600">With Notes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads by company, industry, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                  <SelectItem value="New">New ({statusCounts['New']})</SelectItem>
                  <SelectItem value="High Potential">High Potential ({statusCounts['High Potential']})</SelectItem>
                  <SelectItem value="Follow-up">Follow-up ({statusCounts['Follow-up']})</SelectItem>
                  <SelectItem value="Not Connected">Not Connected ({statusCounts['Not Connected']})</SelectItem>
                </SelectContent>
              </Select>

              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevanceScore">Relevance Score</SelectItem>
                  <SelectItem value="company">Company Name</SelectItem>
                  <SelectItem value="founded">Founded Year</SelectItem>
                  <SelectItem value="employeeCount">Employee Count</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={toggleSortOrder}
                className="px-3"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="grid grid-cols-5 w-full lg:w-auto">
          <TabsTrigger value="all" className="relative">
            All
            <Badge variant="secondary" className="ml-2 text-xs">{statusCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="New" className="relative">
            New
            <Badge variant="secondary" className="ml-2 text-xs">{statusCounts['New']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="High Potential" className="relative">
            High Potential
            <Badge variant="secondary" className="ml-2 text-xs">{statusCounts['High Potential']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="Follow-up" className="relative">
            Follow-up
            <Badge variant="secondary" className="ml-2 text-xs">{statusCounts['Follow-up']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="Not Connected" className="relative">
            Not Connected
            <Badge variant="secondary" className="ml-2 text-xs">{statusCounts['Not Connected']}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Results */}
      {filteredLeads.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredLeads.length} of {leads.length} leads
            </p>
          </div>
          
          <div className="space-y-4">
            {filteredLeads.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <div className="p-4 bg-gray-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No leads found</h3>
            <p className="text-gray-600 mb-4">
              {leads.length === 0 
                ? "You haven't discovered any leads yet. Go to the dashboard to start discovering leads."
                : "Try adjusting your search criteria or filters to find more leads."
              }
            </p>
            {leads.length === 0 && (
              <Button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-[#4285F4] hover:bg-[#3367D6] text-white"
              >
                Discover Leads
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}