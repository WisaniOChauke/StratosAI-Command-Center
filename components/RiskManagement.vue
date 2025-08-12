<template>
  <v-card class="executive-card" elevation="0">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="error">mdi-shield-alert</v-icon>
      <span class="text-h6 font-weight-bold">Risk Management</span>
      <v-spacer />
      <v-chip :color="overallRiskColor" variant="tonal" size="small">
        {{ overallRiskLevel }} Risk
      </v-chip>
    </v-card-title>
    
    <v-card-text>
      <v-row>
        <v-col v-for="risk in riskMetrics" :key="risk.category" cols="12" md="6">
          <div class="risk-item pa-3 rounded-lg mb-3" :class="`bg-${risk.color}-lighten-5`">
            <div class="d-flex justify-space-between align-center mb-2">
              <h4 class="text-subtitle-1 font-weight-medium">{{ risk.category }}</h4>
              <v-chip :color="risk.color" size="x-small" variant="elevated">
                {{ risk.level }}
              </v-chip>
            </div>
            
            <v-progress-linear
              :model-value="risk.score"
              :color="risk.color"
              height="8"
              rounded
              class="mb-2"
            />
            
            <div class="d-flex justify-space-between">
              <span class="text-caption">Score: {{ risk.score }}/100</span>
              <span class="text-caption">{{ risk.trend }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-4" />
      
      <div class="text-center">
        <v-btn color="error" variant="outlined" size="small" class="mr-2" @click="showRiskReport = true">
          View Risk Report
        </v-btn>
        <v-btn color="primary" variant="outlined" size="small" @click="showMitigationPlans = true">
          Mitigation Plans
        </v-btn>
      </div>
    </v-card-text>
    
    <!-- Risk Report Dialog -->
    <v-dialog v-model="showRiskReport" max-width="800">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold d-flex align-center">
          <v-icon class="mr-2" color="error">mdi-file-document-alert</v-icon>
          Comprehensive Risk Report
        </v-card-title>
        
        <v-card-text>
          <div class="mb-4">
            <h4 class="mb-2">Executive Summary</h4>
            <p class="text-body-2">Overall risk assessment indicates medium-level exposure across multiple categories. Immediate attention required for market risks while operational improvements show positive trends.</p>
          </div>
          
          <v-row>
            <v-col v-for="risk in detailedRisks" :key="risk.category" cols="12" md="6">
              <v-card variant="outlined" class="mb-3">
                <v-card-text>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <h5>{{ risk.category }}</h5>
                    <v-chip :color="getRiskColor(risk.score)" size="small">{{ risk.score }}/100</v-chip>
                  </div>
                  <p class="text-caption mb-2">{{ risk.description }}</p>
                  <div class="text-caption">
                    <strong>Key Factors:</strong>
                    <ul class="mt-1">
                      <li v-for="factor in risk.factors" :key="factor">{{ factor }}</li>
                    </ul>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showRiskReport = false">Close</v-btn>
          <v-btn color="primary" @click="exportRiskReport">Export Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Mitigation Plans Dialog -->
    <v-dialog v-model="showMitigationPlans" max-width="900">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold d-flex align-center">
          <v-icon class="mr-2" color="primary">mdi-shield-check</v-icon>
          Risk Mitigation Plans
        </v-card-title>
        
        <v-card-text>
          <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="plan in mitigationPlans" :key="plan.risk">
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon :color="getPriorityColor(plan.priority)" class="mr-2">{{ getPriorityIcon(plan.priority) }}</v-icon>
                  <span class="font-weight-medium">{{ plan.risk }}</span>
                  <v-spacer />
                  <v-chip :color="getPriorityColor(plan.priority)" size="small" variant="tonal">
                    {{ plan.priority }} Priority
                  </v-chip>
                </div>
              </v-expansion-panel-title>
              
              <v-expansion-panel-text>
                <div class="mb-3">
                  <h6 class="mb-2">Mitigation Strategy:</h6>
                  <p class="text-body-2">{{ plan.strategy }}</p>
                </div>
                
                <div class="mb-3">
                  <h6 class="mb-2">Action Items:</h6>
                  <v-list density="compact">
                    <v-list-item v-for="(action, index) in plan.actions" :key="index">
                      <template v-slot:prepend>
                        <v-icon size="16">mdi-check-circle-outline</v-icon>
                      </template>
                      <v-list-item-title class="text-body-2">{{ action }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
                
                <div class="d-flex justify-space-between text-caption">
                  <span><strong>Timeline:</strong> {{ plan.timeline }}</span>
                  <span><strong>Owner:</strong> {{ plan.owner }}</span>
                  <span><strong>Budget:</strong> {{ plan.budget }}</span>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showMitigationPlans = false">Close</v-btn>
          <v-btn color="primary" @click="exportMitigationPlans">Export Plans</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
const riskMetrics = [
  { category: 'Financial', score: 25, level: 'Low', color: 'success', trend: '↓ Improving' },
  { category: 'Operational', score: 45, level: 'Medium', color: 'warning', trend: '→ Stable' },
  { category: 'Market', score: 65, level: 'High', color: 'error', trend: '↑ Increasing' },
  { category: 'Compliance', score: 15, level: 'Low', color: 'success', trend: '↓ Improving' }
]

const overallRiskLevel = computed(() => {
  const avgScore = riskMetrics.reduce((sum, risk) => sum + risk.score, 0) / riskMetrics.length
  return avgScore > 60 ? 'High' : avgScore > 30 ? 'Medium' : 'Low'
})

const showRiskReport = ref(false)
const showMitigationPlans = ref(false)

const overallRiskColor = computed(() => {
  const level = overallRiskLevel.value
  return level === 'High' ? 'error' : level === 'Medium' ? 'warning' : 'success'
})

const detailedRisks = [
  {
    category: 'Financial Risk',
    score: 25,
    description: 'Low exposure to financial volatility with strong cash flow management.',
    factors: ['Stable revenue streams', 'Diversified income sources', 'Strong cash reserves']
  },
  {
    category: 'Operational Risk',
    score: 45,
    description: 'Moderate operational challenges requiring process optimization.',
    factors: ['Supply chain dependencies', 'Staff turnover rates', 'System reliability']
  },
  {
    category: 'Market Risk',
    score: 65,
    description: 'High market volatility and competitive pressure in key segments.',
    factors: ['Competitive landscape', 'Market saturation', 'Economic uncertainty']
  },
  {
    category: 'Compliance Risk',
    score: 15,
    description: 'Excellent compliance record with proactive regulatory management.',
    factors: ['Regular audits', 'Updated policies', 'Staff training programs']
  }
]

const mitigationPlans = [
  {
    risk: 'Market Risk - Competitive Pressure',
    priority: 'high',
    strategy: 'Implement differentiation strategy through innovation and customer experience enhancement.',
    actions: [
      'Launch new product features based on customer feedback',
      'Enhance customer support and onboarding processes',
      'Develop strategic partnerships for market expansion',
      'Invest in R&D for next-generation solutions'
    ],
    timeline: '3-6 months',
    owner: 'Chief Strategy Officer',
    budget: '$500K'
  },
  {
    risk: 'Operational Risk - Process Efficiency',
    priority: 'medium',
    strategy: 'Streamline operations through automation and process optimization.',
    actions: [
      'Implement workflow automation tools',
      'Conduct process mapping and optimization',
      'Provide staff training on new procedures',
      'Establish performance monitoring systems'
    ],
    timeline: '2-4 months',
    owner: 'Chief Operating Officer',
    budget: '$200K'
  },
  {
    risk: 'Financial Risk - Cash Flow Management',
    priority: 'low',
    strategy: 'Maintain strong financial controls and diversify revenue streams.',
    actions: [
      'Implement advanced cash flow forecasting',
      'Diversify customer base and revenue sources',
      'Establish credit facilities for contingencies',
      'Regular financial health assessments'
    ],
    timeline: '1-3 months',
    owner: 'Chief Financial Officer',
    budget: '$100K'
  }
]

const getRiskColor = (score: number) => {
  return score >= 60 ? 'error' : score >= 40 ? 'warning' : 'success'
}

const getPriorityColor = (priority: string) => {
  return priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'success'
}

const getPriorityIcon = (priority: string) => {
  return priority === 'high' ? 'mdi-alert' : priority === 'medium' ? 'mdi-alert-circle' : 'mdi-check-circle'
}

const exportRiskReport = () => {
  const content = `STRATOSAI RISK ASSESSMENT REPORT\n${'='.repeat(50)}\n\nGenerated: ${new Date().toLocaleString()}\n\nEXECUTIVE SUMMARY\n${'-'.repeat(20)}\nOverall Risk Level: ${overallRiskLevel.value}\n\nDETAILED RISK ANALYSIS\n${'-'.repeat(25)}\n${detailedRisks.map(risk => `${risk.category}: ${risk.score}/100\n${risk.description}\n`).join('\n')}\n\nGenerated by StratosAI Command Center`
  
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `risk-report-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

const exportMitigationPlans = () => {
  const content = `STRATOSAI MITIGATION PLANS\n${'='.repeat(40)}\n\nGenerated: ${new Date().toLocaleString()}\n\n${mitigationPlans.map(plan => `RISK: ${plan.risk}\nPRIORITY: ${plan.priority.toUpperCase()}\nSTRATEGY: ${plan.strategy}\nTIMELINE: ${plan.timeline}\nOWNER: ${plan.owner}\nBUDGET: ${plan.budget}\n\nACTIONS:\n${plan.actions.map(action => `• ${action}`).join('\n')}\n\n${'─'.repeat(50)}\n\n`).join('')}Generated by StratosAI Command Center`
  
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `mitigation-plans-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
}
</script>