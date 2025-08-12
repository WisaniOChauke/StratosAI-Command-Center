<template>
  <div class="command-center">
    <v-app-bar elevation="0" class="cyber-bar">
      <div class="d-flex align-center ml-4">
        <div class="logo-container">
          <v-icon class="neon-text" size="40" color="primary">mdi-radar</v-icon>
          <div class="ml-3">
            <h1 class="text-h4 font-weight-black executive-text" style="font-family: 'Playfair Display'">
              STRATOS<span class="text-accent">AI</span>
            </h1>
            <div class="text-caption text-medium-emphasis">Command Center</div>
          </div>
        </div>
      </div>
      
      <v-spacer />
      
      <div class="d-flex align-center ga-3 mr-4">
        <v-chip 
          class="status-pulse" 
          :color="isConnected ? 'success' : 'error'" 
          variant="elevated"
          size="small"
        >
          <v-icon start size="12">mdi-circle</v-icon>
          {{ isConnected ? 'LIVE' : 'OFFLINE' }}
        </v-chip>
        
        <v-btn 
          icon="mdi-theme-light-dark" 
          variant="elevated" 
          @click="toggleTheme"
          class="theme-toggle-btn"
          color="primary"
          size="small"
        />
        
        <DataExport />
        <UserSettings />
        
        <v-avatar size="40" class="ml-2">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
        </v-avatar>
      </div>
    </v-app-bar>

    <v-main class="pa-6">
      <v-container fluid>
        <!-- Spectacular Header -->
        <v-row class="mb-8">
          <v-col cols="12">
            <div class="hero-section text-center pa-8 rounded-xl">
              <div class="hero-content">
                <h1 class="text-h2 font-weight-black mb-4 executive-text" style="font-family: 'Playfair Display'">
                  MISSION CONTROL
                </h1>
                <p class="text-h5 text-medium-emphasis mb-4">
                  AI-Powered Strategic Intelligence • Neural Network Active
                </p>
                <div class="d-flex justify-center align-center ga-4">
                  <v-chip color="success" variant="elevated" size="large">
                    <v-icon start>mdi-brain</v-icon>
                    AI Systems Online
                  </v-chip>
                  <v-chip color="info" variant="elevated" size="large">
                    <v-icon start>mdi-clock-outline</v-icon>
                    {{ formattedLastUpdate }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- KPI Grid -->
        <v-row class="mb-8">
          <v-col
            v-for="kpi in kpis"
            :key="kpi.id"
            cols="12"
            sm="6"
            lg="3"
          >
            <ExecutiveKPI :kpi="kpi" />
          </v-col>
        </v-row>

        <!-- Advanced Analytics Grid -->
        <v-row class="mb-8">
          <!-- Revenue Chart -->
          <v-col cols="12" lg="6">
            <RevenueChart />
          </v-col>
          
          <!-- Predictive Analytics -->
          <v-col cols="12" lg="6">
            <PredictiveChart />
          </v-col>
        </v-row>
        
        <!-- Customer Journey & Risk Management -->
        <v-row class="mb-8">
          <v-col cols="12" lg="8">
            <CustomerJourney />
          </v-col>
          
          <v-col cols="12" lg="4">
            <RiskManagement />
          </v-col>
        </v-row>

        <!-- AI Insights Panel -->
        <v-row>
          <v-col cols="12" lg="8">
            <v-card class="executive-card" elevation="0">
              <v-card-title class="text-h6 font-weight-bold">Operational Metrics</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6" md="3">
                    <div class="text-center">
                      <div class="text-h5 font-weight-bold text-success">{{ operationalMetrics.systemUptime }}%</div>
                      <div class="text-caption">System Uptime</div>
                    </div>
                  </v-col>
                  <v-col cols="6" md="3">
                    <div class="text-center">
                      <div class="text-h5 font-weight-bold text-info">{{ operationalMetrics.responseTime }}ms</div>
                      <div class="text-caption">Response Time</div>
                    </div>
                  </v-col>
                  <v-col cols="6" md="3">
                    <div class="text-center">
                      <div class="text-h5 font-weight-bold text-warning">{{ operationalMetrics.errorRate }}%</div>
                      <div class="text-caption">Error Rate</div>
                    </div>
                  </v-col>
                  <v-col cols="6" md="3">
                    <div class="text-center">
                      <div class="text-h5 font-weight-bold text-primary">{{ operationalMetrics.throughput }}</div>
                      <div class="text-caption">Req/min</div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <v-card class="executive-card" elevation="0">
              <v-card-title class="text-h6 font-weight-bold pb-4">
                <v-icon class="mr-2" color="primary">mdi-brain</v-icon>
                AI Strategic Insights
              </v-card-title>
              
              <v-card-text class="pa-0">
                <AIInsightCard
                  v-for="insight in criticalInsights"
                  :key="insight.id"
                  :insight="insight"
                />
                
                <div class="pa-6 pt-0">
                  <v-btn
                    block
                    variant="outlined"
                    color="primary"
                    class="font-weight-medium"
                    @click="showAllInsights = true"
                  >
                    View All Insights
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Performance Metrics -->
        <v-row class="mt-8">
          <v-col cols="12">
            <v-card class="executive-card" elevation="0">
              <v-card-title class="text-h6 font-weight-bold">
                Performance Overview
              </v-card-title>
              
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="text-center pa-4">
                      <v-progress-circular
                        :model-value="94.2"
                        size="120"
                        width="8"
                        color="success"
                        class="mb-4"
                      >
                        <span class="text-h5 font-weight-bold">94.2%</span>
                      </v-progress-circular>
                      <h4 class="text-h6 font-weight-medium">Customer Satisfaction</h4>
                    </div>
                  </v-col>
                  
                  <v-col cols="12" md="4">
                    <div class="text-center pa-4">
                      <v-progress-circular
                        :model-value="87.5"
                        size="120"
                        width="8"
                        color="primary"
                        class="mb-4"
                      >
                        <span class="text-h5 font-weight-bold">87.5%</span>
                      </v-progress-circular>
                      <h4 class="text-h6 font-weight-medium">Operational Efficiency</h4>
                    </div>
                  </v-col>
                  
                  <v-col cols="12" md="4">
                    <div class="text-center pa-4">
                      <v-progress-circular
                        :model-value="76.8"
                        size="120"
                        width="8"
                        color="warning"
                        class="mb-4"
                      >
                        <span class="text-h5 font-weight-bold">76.8%</span>
                      </v-progress-circular>
                      <h4 class="text-h6 font-weight-medium">Market Share</h4>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
    <!-- All Insights Dialog -->
    <v-dialog v-model="showAllInsights" max-width="1000">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold d-flex align-center">
          <v-icon class="mr-2" color="primary">mdi-brain</v-icon>
          All AI Strategic Insights
          <v-spacer />
          <v-chip color="success" variant="tonal" size="small">
            {{ allInsights.length }} Insights
          </v-chip>
        </v-card-title>
        
        <v-card-text style="max-height: 600px; overflow-y: auto;">
          <v-row>
            <v-col v-for="insight in allInsights" :key="insight.id" cols="12" md="6">
              <v-card variant="outlined" class="mb-3">
                <v-card-text>
                  <div class="d-flex align-center mb-3">
                    <v-icon :color="getInsightColor(insight.priority)" class="mr-2">
                      {{ getCategoryIcon(insight.category) }}
                    </v-icon>
                    <div class="flex-grow-1">
                      <h5 class="mb-1">{{ insight.title }}</h5>
                      <div class="d-flex gap-2">
                        <v-chip :color="getInsightColor(insight.priority)" size="x-small" variant="tonal">
                          {{ insight.priority }}
                        </v-chip>
                        <v-chip color="info" size="x-small" variant="tonal">
                          {{ insight.confidence }}% confidence
                        </v-chip>
                      </div>
                    </div>
                  </div>
                  
                  <p class="text-body-2 mb-3">{{ insight.description }}</p>
                  
                  <div class="mb-3">
                    <div class="d-flex justify-space-between text-caption mb-2">
                      <span><strong>Impact:</strong> {{ insight.impact }}</span>
                      <span><strong>Timeframe:</strong> {{ insight.timeframe }}</span>
                    </div>
                  </div>
                  
                  <v-expansion-panels variant="accordion" class="mb-2">
                    <v-expansion-panel>
                      <v-expansion-panel-title class="text-caption">
                        View Recommendations ({{ insight.recommendations.length }})
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-list density="compact">
                          <v-list-item v-for="rec in insight.recommendations" :key="rec">
                            <template v-slot:prepend>
                              <v-icon size="12">mdi-arrow-right</v-icon>
                            </template>
                            <v-list-item-title class="text-caption">{{ rec }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showAllInsights = false">Close</v-btn>
          <v-btn color="primary" @click="exportInsights">Export Insights</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const dashboardStore = useDashboardStore()
const { kpis, insights, criticalInsights, formattedLastUpdate, operationalMetrics } = storeToRefs(dashboardStore)
const { isConnected } = useWebSocket()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}

const showAllInsights = ref(false)

const allInsights = [
  {
    id: '1',
    title: 'Revenue Acceleration Opportunity',
    description: 'AI analysis indicates 18% revenue increase potential through strategic customer segmentation and targeted marketing campaigns.',
    confidence: 87,
    priority: 'high',
    category: 'revenue',
    impact: 'High',
    timeframe: '3-6 months',
    recommendations: [
      'Implement advanced customer segmentation',
      'Launch targeted marketing campaigns',
      'Optimize pricing strategy for key segments'
    ]
  },
  {
    id: '2',
    title: 'Market Expansion Signal',
    description: 'Emerging market trends suggest optimal timing for European expansion within Q2, with 92% confidence based on market analysis.',
    confidence: 92,
    priority: 'high',
    category: 'market',
    impact: 'Very High',
    timeframe: '2-4 months',
    recommendations: [
      'Conduct detailed market research for EU markets',
      'Establish strategic partnerships in target regions',
      'Develop localized product offerings'
    ]
  },
  {
    id: '3',
    title: 'Operational Efficiency Gains',
    description: 'Process automation opportunities identified that could reduce operational costs by 15% while improving service quality.',
    confidence: 78,
    priority: 'medium',
    category: 'operations',
    impact: 'Medium',
    timeframe: '4-8 months',
    recommendations: [
      'Implement workflow automation tools',
      'Redesign key business processes',
      'Train staff on new automated systems'
    ]
  },
  {
    id: '4',
    title: 'Customer Retention Enhancement',
    description: 'Predictive model identifies at-risk customers with 85% accuracy, enabling proactive retention strategies.',
    confidence: 85,
    priority: 'medium',
    category: 'customer',
    impact: 'High',
    timeframe: '1-3 months',
    recommendations: [
      'Deploy predictive churn model',
      'Create personalized retention campaigns',
      'Enhance customer success programs'
    ]
  },
  {
    id: '5',
    title: 'Technology Infrastructure Optimization',
    description: 'Cloud migration analysis shows potential for 25% cost reduction and improved scalability.',
    confidence: 73,
    priority: 'low',
    category: 'technology',
    impact: 'Medium',
    timeframe: '6-12 months',
    recommendations: [
      'Plan phased cloud migration strategy',
      'Optimize current infrastructure usage',
      'Implement cloud-native solutions'
    ]
  }
]

const getInsightColor = (priority: string) => {
  return priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'info'
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'revenue': return 'mdi-currency-usd'
    case 'market': return 'mdi-earth'
    case 'operations': return 'mdi-cog'
    case 'customer': return 'mdi-account-group'
    case 'technology': return 'mdi-server'
    default: return 'mdi-lightbulb'
  }
}

const exportInsights = () => {
  const content = `STRATOSAI AI INSIGHTS REPORT\n${'='.repeat(45)}\n\nGenerated: ${new Date().toLocaleString()}\n\n${allInsights.map(insight => `INSIGHT: ${insight.title}\nCONFIDENCE: ${insight.confidence}%\nPRIORITY: ${insight.priority.toUpperCase()}\nIMPACT: ${insight.impact}\nTIMEFRAME: ${insight.timeframe}\n\nDESCRIPTION:\n${insight.description}\n\nRECOMMENDATIONS:\n${insight.recommendations.map(rec => `• ${rec}`).join('\n')}\n\n${'─'.repeat(60)}\n\n`).join('')}Generated by StratosAI Command Center`
  
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ai-insights-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>