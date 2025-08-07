'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Brain,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { generateAIInsight } from '@/lib/aiInsights'

interface Lead {
  id: string
  company: string
  industry: string
  location: {
    city: string
    country: string
  }
  website: string
  email?: string
  phone?: string
  employeeCount: string
  founded: number
  revenue: string
  description: string
  status: 'New' | 'High Potential' | 'Follow-up' | 'Not Connected'
  relevanceScore: number
  notes: string
  tasks: any[]
}

interface LeadCardProps {
  lead: Lead
}

const statusColors = {
  'New': 'bg-blue-100 text-blue-800 border-blue-200',
  'High Potential': 'bg-green-100 text-green-800 border-green-200',
  'Follow-up': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Not Connected': 'bg-gray-100 text-gray-800 border-gray-200'
}

export default function LeadCard({ lead: initialLead }: LeadCardProps) {
  const [lead, setLead] = useState(initialLead)
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false)
  const [aiInsight, setAiInsight] = useState('')
  const [notes, setNotes] = useState(lead.notes)

  const handleStatusChange = (newStatus: string) => {
    const updatedLead = { ...lead, status: newStatus as any }
    setLead(updatedLead)
    
    // Update in localStorage
    const existingLeads = JSON.parse(localStorage.getItem('truleadai_leads') || '[]')
    const updatedLeads = existingLeads.map((l: any) => 
      l.id === lead.id ? updatedLead : l
    )
    localStorage.setItem('truleadai_leads', JSON.stringify(updatedLeads))
  }

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes)
    const updatedLead = { ...lead, notes: newNotes }
    setLead(updatedLead)
    
    // Update in localStorage
    const existingLeads = JSON.parse(localStorage.getItem('truleadai_leads') || '[]')
    const updatedLeads = existingLeads.map((l: any) => 
      l.id === lead.id ? updatedLead : l
    )
    localStorage.setItem('truleadai_leads', JSON.stringify(updatedLeads))
  }

  const generateInsight = async () => {
    setIsGeneratingInsight(true)
    try {
      const insight = await generateAIInsight(lead)
      setAiInsight(insight)
    } catch (error) {
      console.error('Failed to generate AI insight:', error)
    } finally {
      setIsGeneratingInsight(false)
    }
  }

  return (
    <Card className="border-l-4 border-l-[#4285F4] hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#4285F4] bg-opacity-10 rounded-lg">
                <Building2 className="h-5 w-5 text-[#4285F4]" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-800">{lead.company}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{lead.industry}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{lead.relevanceScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={lead.status} onValueChange={handleStatusChange}>
              <SelectTrigger className={`w-36 text-xs font-medium ${statusColors[lead.status]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="High Potential">High Potential</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Not Connected">Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <CardDescription className="line-clamp-2">{lead.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{lead.location.city}, {lead.location.country}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{lead.employeeCount} employees</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Founded {lead.founded}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span>{lead.revenue} revenue</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {lead.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={lead.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Website
              </a>
            </Button>
          )}
          
          {lead.email && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${lead.email}`}>
                <Mail className="h-4 w-4 mr-1" />
                Email
              </a>
            </Button>
          )}
          
          {lead.phone && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${lead.phone}`}>
                <Phone className="h-4 w-4 mr-1" />
                Call
              </a>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="p-2 bg-[#4285F4] bg-opacity-10 rounded-lg">
                    <Building2 className="h-5 w-5 text-[#4285F4]" />
                  </div>
                  {lead.company}
                </DialogTitle>
                <DialogDescription>
                  Detailed lead information and AI-powered insights
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* AI Insights Section */}
                <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-[#8E44AD]" />
                      <h3 className="font-semibold text-gray-800">AI-Powered Insights</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateInsight}
                      disabled={isGeneratingInsight}
                    >
                      {isGeneratingInsight ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-1" />
                          Generate Insight
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {aiInsight ? (
                    <div className="bg-white rounded p-3 text-sm">
                      <div className="whitespace-pre-wrap">{aiInsight}</div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Click "Generate Insight" to get personalized sales angles and conversation starters for this lead.
                    </p>
                  )}
                </div>

                {/* Notes Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes & Observations
                  </label>
                  <Textarea
                    placeholder="Add your notes about this lead..."
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Contact Details</h3>
                    <div className="space-y-2 text-sm">
                      {lead.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a href={`mailto:${lead.email}`} className="text-[#4285F4] hover:underline">
                            {lead.email}
                          </a>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <a href={`tel:${lead.phone}`} className="text-[#4285F4] hover:underline">
                            {lead.phone}
                          </a>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:underline">
                            {lead.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Company Info</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Industry:</strong> {lead.industry}</div>
                      <div><strong>Employees:</strong> {lead.employeeCount}</div>
                      <div><strong>Founded:</strong> {lead.founded}</div>
                      <div><strong>Revenue:</strong> {lead.revenue}</div>
                      <div><strong>Location:</strong> {lead.location.city}, {lead.location.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}