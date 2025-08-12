<template>
  <v-card class="anomaly-detector executive-card" elevation="0">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="warning">mdi-alert-octagon</v-icon>
      <span class="text-h6 font-weight-bold">Anomaly Detection</span>
      <v-spacer />
      <v-chip :color="alertLevel" variant="elevated" size="small">
        {{ anomalies.length }} Alerts
      </v-chip>
    </v-card-title>
    
    <v-card-text>
      <div v-if="isScanning" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" size="48" />
        <div class="mt-4 text-h6">Scanning for anomalies...</div>
        <div class="text-caption">AI analyzing {{ scanProgress }}% complete</div>
      </div>
      
      <div v-else>
        <div v-for="anomaly in anomalies" :key="anomaly.id" class="anomaly-item mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon :color="getSeverityColor(anomaly.severity)" class="mr-2">
              {{ getSeverityIcon(anomaly.severity) }}
            </v-icon>
            <h4 class="flex-grow-1">{{ anomaly.title }}</h4>
            <v-chip :color="getSeverityColor(anomaly.severity)" variant="tonal" size="small">
              {{ anomaly.severity }}
            </v-chip>
          </div>
          
          <p class="text-body-2 mb-2">{{ anomaly.description }}</p>
          
          <div class="anomaly-metrics mb-3">
            <div class="d-flex justify-space-between">
              <span class="text-caption">Deviation:</span>
              <span class="font-weight-bold">{{ anomaly.deviation }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-caption">Confidence:</span>
              <span class="font-weight-bold">{{ anomaly.confidence }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-caption">Detected:</span>
              <span class="text-caption">{{ formatTime(anomaly.timestamp) }}</span>
            </div>
          </div>
          
          <div class="d-flex gap-2">
            <v-btn variant="outlined" size="small" @click="investigateAnomaly(anomaly)">
              Investigate
            </v-btn>
            <v-btn variant="text" size="small" @click="dismissAnomaly(anomaly.id)">
              Dismiss
            </v-btn>
          </div>
        </div>
        
        <div v-if="!anomalies.length" class="text-center py-8">
          <v-icon size="64" color="success" class="mb-4">mdi-shield-check</v-icon>
          <div class="text-h6 mb-2">All Systems Normal</div>
          <div class="text-caption">No anomalies detected in the last 24 hours</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Anomaly {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  deviation: number
  confidence: number
  timestamp: Date
  metric: string
}

const isScanning = ref(false)
const scanProgress = ref(0)
const anomalies = ref<Anomaly[]>([
  {
    id: '1',
    title: 'Unusual Revenue Spike',
    description: 'Revenue increased by 45% compared to historical patterns, exceeding 3-sigma threshold.',
    severity: 'medium',
    deviation: 45.2,
    confidence: 89,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metric: 'revenue'
  },
  {
    id: '2',
    title: 'Customer Churn Anomaly',
    description: 'Churn rate dropped significantly below expected range, indicating potential data quality issues.',
    severity: 'high',
    deviation: -23.7,
    confidence: 94,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    metric: 'churn'
  }
])

const alertLevel = computed(() => {
  const severities = anomalies.value.map(a => a.severity)
  if (severities.includes('critical')) return 'error'
  if (severities.includes('high')) return 'warning'
  if (severities.includes('medium')) return 'info'
  return 'success'
})

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'error'
    case 'high': return 'warning'
    case 'medium': return 'info'
    case 'low': return 'success'
    default: return 'grey'
  }
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical': return 'mdi-alert'
    case 'high': return 'mdi-alert-circle'
    case 'medium': return 'mdi-information'
    case 'low': return 'mdi-check-circle'
    default: return 'mdi-help-circle'
  }
}

const investigateAnomaly = (anomaly: Anomaly) => {
  console.log('Investigating anomaly:', anomaly)
  // Open detailed analysis view
}

const dismissAnomaly = (id: string) => {
  anomalies.value = anomalies.value.filter(a => a.id !== id)
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Simulate periodic scanning
onMounted(() => {
  setInterval(() => {
    if (Math.random() > 0.8) {
      // Simulate new anomaly detection
      const newAnomaly: Anomaly = {
        id: Date.now().toString(),
        title: 'Performance Deviation Detected',
        description: 'System response time exceeded normal thresholds.',
        severity: 'medium',
        deviation: Math.random() * 30 + 10,
        confidence: Math.random() * 20 + 80,
        timestamp: new Date(),
        metric: 'performance'
      }
      anomalies.value.unshift(newAnomaly)
    }
  }, 30000) // Check every 30 seconds
})
</script>

<style scoped>
.anomaly-item {
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
}

.anomaly-metrics {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 8px;
  font-size: 0.875rem;
}
</style>