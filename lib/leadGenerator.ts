interface FilterOptions {
  continent: string
  country: string
  region: string
  city: string
  industry: string
}

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

const companyNames = [
  'TechFlow Solutions', 'DataVault Corp', 'CloudMaster Inc', 'InnovateTech', 
  'NextGen AI', 'CyberShield Pro', 'QuantumLeap Labs', 'SmartBridge Co',
  'FutureTech Systems', 'AlphaByte Solutions', 'MetaCore Industries',
  'DigiTransform Ltd', 'NanoTech Innovations', 'HyperScale Corp',
  'EliteCode Systems', 'VisionTech Group', 'ProActive Solutions',
  'DynamicFlow Inc', 'TechPioneer Labs', 'CodeCraft Studios'
]

const cities = {
  'United States': ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Austin', 'Seattle'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
}

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
  'Education', 'Real Estate', 'Consulting', 'Marketing', 'Legal'
]

const employeeCounts = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
const revenues = ['<$1M', '$1M-$10M', '$10M-$50M', '$50M-$100M', '$100M+']

function generateRandomLead(filters: FilterOptions): Lead {
  const selectedIndustry = filters.industry || industries[Math.floor(Math.random() * industries.length)]
  const selectedCountry = filters.country || Object.keys(cities)[Math.floor(Math.random() * Object.keys(cities).length)]
  const availableCities = cities[selectedCountry as keyof typeof cities] || ['Unknown City']
  const selectedCity = availableCities[Math.floor(Math.random() * availableCities.length)]
  
  const company = companyNames[Math.floor(Math.random() * companyNames.length)]
  const domain = company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'
  
  return {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    company,
    industry: selectedIndustry,
    location: {
      city: selectedCity,
      country: selectedCountry
    },
    website: `https://${domain}`,
    email: `contact@${domain}`,
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    employeeCount: employeeCounts[Math.floor(Math.random() * employeeCounts.length)],
    founded: 2000 + Math.floor(Math.random() * 24),
    revenue: revenues[Math.floor(Math.random() * revenues.length)],
    description: `A leading ${selectedIndustry.toLowerCase()} company based in ${selectedCity}, ${selectedCountry}. Specializing in innovative solutions and cutting-edge technology to drive business growth.`,
    status: 'New',
    relevanceScore: Math.floor(Math.random() * 40) + 60, // 60-100 for high relevance
    notes: '',
    tasks: []
  }
}

export function generateLeadBatch(count: number, filters: FilterOptions): Lead[] {
  const leads: Lead[] = []
  
  for (let i = 0; i < count; i++) {
    leads.push(generateRandomLead(filters))
  }
  
  // Sort by relevance score (highest first)
  return leads.sort((a, b) => b.relevanceScore - a.relevanceScore)
}