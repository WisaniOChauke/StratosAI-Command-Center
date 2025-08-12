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
        <v-btn color="error" variant="outlined" size="small" class="mr-2">
          View Risk Report
        </v-btn>
        <v-btn color="primary" variant="outlined" size="small">
          Mitigation Plans
        </v-btn>
      </div>
    </v-card-text>
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

const overallRiskColor = computed(() => {
  const level = overallRiskLevel.value
  return level === 'High' ? 'error' : level === 'Medium' ? 'warning' : 'success'
})
</script>