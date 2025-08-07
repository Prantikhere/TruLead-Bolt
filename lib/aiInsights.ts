interface Lead {
  company: string
  industry: string
  location: {
    city: string
    country: string
  }
  employeeCount: string
  founded: number
  revenue: string
  description: string
}

export async function generateAIInsight(lead: Lead): Promise<string> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate contextual insights based on lead data
  const insights = []
  
  // Company size insights
  if (lead.employeeCount.includes('1-10')) {
    insights.push('🎯 **Startup Approach**: This is a small startup. Focus on cost-effective solutions and quick implementation. Decision-making is likely centralized with the founder/CEO.')
  } else if (lead.employeeCount.includes('1000+')) {
    insights.push('🏢 **Enterprise Strategy**: Large corporation with complex decision processes. Expect longer sales cycles but higher deal values. Consider multi-stakeholder approach.')
  }
  
  // Industry-specific insights
  const industryInsights: { [key: string]: string } = {
    'Technology': '💻 **Tech-Savvy Audience**: They understand technical solutions well. Lead with innovation, scalability, and technical specifications. Emphasize ROI and competitive advantages.',
    'Healthcare': '🏥 **Compliance Focus**: Healthcare organizations prioritize security, compliance, and patient privacy. Highlight HIPAA compliance and data protection features.',
    'Finance': '💰 **Risk-Averse**: Financial institutions are cautious about new solutions. Emphasize security, regulatory compliance, and proven track record.',
    'Manufacturing': '🏭 **Operational Efficiency**: Focus on how your solution improves operational efficiency, reduces costs, or enhances production quality.',
    'Retail': '🛍️ **Customer Experience**: Retail companies care about customer experience and sales growth. Show how your solution improves customer satisfaction.'
  }
  
  if (industryInsights[lead.industry]) {
    insights.push(industryInsights[lead.industry])
  }
  
  // Revenue-based insights
  if (lead.revenue.includes('<$1M') || lead.revenue.includes('$1M-$10M')) {
    insights.push('💡 **Budget-Conscious**: Smaller revenue suggests budget constraints. Emphasize cost-effectiveness, quick ROI, and flexible pricing options.')
  } else if (lead.revenue.includes('$100M+')) {
    insights.push('💎 **High-Value Target**: Large revenue company with substantial budget. Focus on comprehensive solutions and premium features.')
  }
  
  // Location-based insights
  const locationInsights: { [key: string]: string } = {
    'United States': '🇺🇸 **US Market**: Direct communication style preferred. Focus on business outcomes, efficiency gains, and competitive positioning.',
    'United Kingdom': '🇬🇧 **UK Market**: Professional yet personal approach works well. Emphasize partnership and long-term relationships.',
    'Germany': '🇩🇪 **German Market**: Detail-oriented and thorough evaluation process. Provide comprehensive technical documentation and specifications.',
    'Japan': '🇯🇵 **Japanese Market**: Relationship-building is crucial. Invest time in trust-building and demonstrate long-term commitment.',
  }
  
  if (locationInsights[lead.location.country]) {
    insights.push(locationInsights[lead.location.country])
  }
  
  // Age of company insights
  const currentYear = new Date().getFullYear()
  const companyAge = currentYear - lead.founded
  
  if (companyAge < 5) {
    insights.push('🚀 **Growth Phase**: Young company likely in growth mode. They may be more open to innovative solutions that can scale with their business.')
  } else if (companyAge > 20) {
    insights.push('🏛️ **Established Player**: Mature company with established processes. Focus on proven solutions and smooth integration with existing systems.')
  }
  
  // Add conversation starters
  const conversationStarters = [
    `"I noticed ${lead.company} has been expanding in the ${lead.industry.toLowerCase()} sector. We've helped similar companies in ${lead.location.city} achieve..."`,
    `"Given ${lead.company}'s focus on ${lead.industry.toLowerCase()}, I thought you might be interested in how we've helped companies of your size..."`,
    `"I saw that ${lead.company} was founded in ${lead.founded}. Companies at your stage often face challenges with..."`,
  ]
  
  insights.push('\n📞 **Conversation Starters**:\n' + conversationStarters.join('\n\n'))
  
  return insights.join('\n\n')
}