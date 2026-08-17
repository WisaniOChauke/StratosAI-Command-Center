<template>
  <div class="command-center">

    <!-- Navbar -->
    <v-app-bar elevation="0" class="stratos-bar" height="60">
      <div class="d-flex align-center ml-5">
        <div class="brand-logo">
          <div class="brand-icon">
            <v-icon color="white" size="18">mdi-radar</v-icon>
          </div>
          <div>
            <div class="brand-name">Stratos<span>AI</span></div>
            <div class="brand-tagline">Command Center</div>
          </div>
        </div>
      </div>

      <v-spacer />

      <div class="d-flex align-center gap-2 mr-5">
        <v-chip
          class="status-pulse"
          :color="isConnected ? 'success' : 'error'"
          variant="tonal"
          size="small"
        >
          <v-icon start size="10">mdi-circle</v-icon>
          {{ isConnected ? 'Live' : 'Offline' }}
        </v-chip>

        <v-btn
          icon="mdi-theme-light-dark"
          variant="text"
          size="small"
          @click="toggleTheme"
        />

        <v-avatar size="32" class="ml-1" style="border: 2px solid rgba(255,255,255,0.1)">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
        </v-avatar>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">

        <!-- Page Header -->
        <div class="page-header d-flex align-end justify-space-between mb-6">
          <div>
            <h1>Executive Dashboard</h1>
            <p>{{ formattedLastUpdate }} · AI systems nominal</p>
          </div>
          <div class="d-flex gap-2">
            <DataExport />
            <UserSettings />
          </div>
        </div>

        <!-- KPI Grid -->
        <v-row class="mb-6">
          <v-col v-for="kpi in kpis" :key="kpi.id" cols="12" sm="6" lg="3">
            <ExecutiveKPI :kpi="kpi" />
          </v-col>
        </v-row>

        <!-- Charts Row -->
        <v-row class="mb-6">
          <v-col cols="12" lg="7">
            <RevenueChart />
          </v-col>
          <v-col cols="12" lg="5">
            <PredictiveChart />
          </v-col>
        </v-row>

        <!-- Analytics + Insights Row -->
        <v-row class="mb-6">
          <v-col cols="12" lg="8">
            <CustomerJourney />
          </v-col>
          <v-col cols="12" lg="4">
            <v-card class="executive-card" elevation="0" style="height: 100%">
              <div class="chart-header">
                <div class="d-flex align-center gap-2">
                  <v-icon color="primary" size="18">mdi-brain</v-icon>
                  <span class="chart-title">AI Insights</span>
                </div>
                <v-chip color="primary" variant="tonal" size="x-small">
                  {{ criticalInsights.length }} active
                </v-chip>
              </div>

              <AIInsightCard
                v-for="insight in criticalInsights"
                :key="insight.id"
                :insight="insight"
              />

              <div class="pa-4 pt-2">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  size="small"
                  @click="showAllInsights = true"
                >
                  View all insights
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bottom Row: Operational + Risk + Performance -->
        <v-row>
          <v-col cols="12" lg="4">
            <v-card class="executive-card pa-5" elevation="0">
              <div class="section-label">Operational Metrics</div>
              <div class="metric-row">
                <span class="metric-name">System Uptime</span>
                <span class="metric-value text-success">{{ operationalMetrics.systemUptime }}%</span>
              </div>
              <div class="metric-row">
                <span class="metric-name">Response Time</span>
                <span class="metric-value">{{ operationalMetrics.responseTime }}ms</span>
              </div>
              <div class="metric-row">
                <span class="metric-name">Error Rate</span>
                <span class="metric-value text-warning">{{ operationalMetrics.errorRate }}%</span>
              </div>
              <div class="metric-row">
                <span class="metric-name">Throughput</span>
                <span class="metric-value">{{ operationalMetrics.throughput }} req/min</span>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <RiskManagement />
          </v-col>

          <v-col cols="12" lg="4">
            <v-card class="executive-card pa-5" elevation="0">
              <div class="section-label">Performance</div>
              <div v-for="metric in performanceMetrics" :key="metric.label" class="mb-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="metric-name">{{ metric.label }}</span>
                  <span class="metric-value">{{ metric.value }}%</span>
                </div>
                <v-progress-linear
                  :model-value="metric.value"
                  :color="metric.color"
                  height="5"
                  rounded
                  bg-color="rgba(255,255,255,0.06)"
                />
              </div>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <!-- All Insights Dialog -->
    <v-dialog v-model="showAllInsights" max-width="860">
      <v-card class="executive-card pa-2" elevation="0">
        <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
          <div class="d-flex align-center gap-2">
            <v-icon color="primary" size="20">mdi-brain</v-icon>
            <span class="text-h6 font-weight-semibold">AI Strategic Insights</span>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showAllInsights = false" />
        </v-card-title>

        <v-card-text style="max-height: 560px; overflow-y: auto;">
          <v-row>
            <v-col v-for="insight in allInsights" :key="insight.id" cols="12" md="6">
              <v-card variant="outlined" class="pa-4 rounded-lg" style="border-color: var(--border-subtle)">
                <div class="d-flex align-center gap-2 mb-2">
                  <v-icon :color="getInsightColor(insight.priority)" size="18">
                    {{ getCategoryIcon(insight.category) }}
                  </v-icon>
                  <v-chip :color="getInsightColor(insight.priority)" size="x-small" variant="tonal">
                    {{ insight.priority }}
                  </v-chip>
                  <v-chip color="info" size="x-small" variant="tonal">
                    {{ insight.confidence }}%
                  </v-chip>
                </div>
                <div class="text-subtitle-2 font-weight-semibold mb-1">{{ insight.title }}</div>
                <div class="text-caption mb-3" style="color: var(--text-secondary)">{{ insight.description }}</div>
                <div class="text-caption" style="color: var(--text-muted)">
                  {{ insight.impact }} impact · {{ insight.timeframe }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 pt-2">
          <v-spacer />
          <v-btn variant="text" size="small" @click="showAllInsights = false">Close</v-btn>
          <v-btn color="primary" variant="tonal" size="small" @click="exportInsights">Export</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const dashboardStore = useDashboardStore()
const { kpis, criticalInsights, formattedLastUpdate, operationalMetrics } = storeToRefs(dashboardStore)
const { isConnected } = useWebSocket()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}

const showAllInsights = ref(false)

const performanceMetrics = [
  { label: 'Customer Satisfaction', value: 94.2, color: 'success' },
  { label: 'Operational Efficiency', value: 87.5, color: 'primary' },
  { label: 'Market Share', value: 76.8, color: 'warning' },
]

const allInsights = [
  {
    id: '1', title: 'Revenue Acceleration Opportunity',
    description: 'AI analysis indicates 18% revenue increase potential through strategic customer segmentation.',
    confidence: 87, priority: 'high', category: 'revenue', impact: 'High', timeframe: '3–6 months',
    recommendations: ['Implement advanced customer segmentation', 'Launch targeted marketing campaigns', 'Optimize pricing strategy']
  },
  {
    id: '2', title: 'Market Expansion Signal',
    description: 'Emerging market trends suggest optimal timing for European expansion within Q2.',
    confidence: 92, priority: 'high', category: 'market', impact: 'Very High', timeframe: '2–4 months',
    recommendations: ['Conduct EU market research', 'Establish strategic partnerships', 'Develop localized offerings']
  },
  {
    id: '3', title: 'Operational Efficiency Gains',
    description: 'Process automation opportunities could reduce operational costs by 15%.',
    confidence: 78, priority: 'medium', category: 'operations', impact: 'Medium', timeframe: '4–8 months',
    recommendations: ['Implement workflow automation', 'Redesign key processes', 'Train staff on new systems']
  },
  {
    id: '4', title: 'Customer Retention Enhancement',
    description: 'Predictive model identifies at-risk customers with 85% accuracy.',
    confidence: 85, priority: 'medium', category: 'customer', impact: 'High', timeframe: '1–3 months',
    recommendations: ['Deploy churn prediction model', 'Create retention campaigns', 'Enhance customer success']
  },
  {
    id: '5', title: 'Infrastructure Optimization',
    description: 'Cloud migration analysis shows 25% cost reduction potential.',
    confidence: 73, priority: 'low', category: 'technology', impact: 'Medium', timeframe: '6–12 months',
    recommendations: ['Plan phased cloud migration', 'Optimize current usage', 'Implement cloud-native solutions']
  }
]

const getInsightColor = (priority: string) =>
  priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'info'

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    revenue: 'mdi-currency-usd', market: 'mdi-earth',
    operations: 'mdi-cog-outline', customer: 'mdi-account-group-outline',
    technology: 'mdi-server-outline'
  }
  return icons[category] ?? 'mdi-lightbulb-outline'
}

const exportInsights = () => {
  const content = allInsights.map(i =>
    `${i.title}\n${i.priority.toUpperCase()} · ${i.confidence}% confidence · ${i.timeframe}\n${i.description}\n`
  ).join('\n---\n\n')
  const blob = new Blob([`StratosAI Insights\n${'='.repeat(40)}\n\n${content}`], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `insights-${Date.now()}.txt`; a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => dashboardStore.fetchDashboardData())
</script>
