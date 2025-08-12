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

onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>