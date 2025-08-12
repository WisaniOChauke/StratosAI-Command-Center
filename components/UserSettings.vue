<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-cog" variant="text" />
    </template>
    
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Dashboard Settings</v-card-title>
      
      <v-card-text>
        <v-tabs v-model="activeTab" class="mb-4">
          <v-tab value="display">Display</v-tab>
          <v-tab value="data">Data</v-tab>
          <v-tab value="notifications">Alerts</v-tab>
        </v-tabs>
        
        <v-window v-model="activeTab">
          <v-window-item value="display">
            <v-switch
              v-model="settings.darkMode"
              label="Dark Mode"
              color="primary"
              class="mb-3"
            />
            
            <v-select
              v-model="settings.refreshInterval"
              :items="refreshOptions"
              label="Auto Refresh"
              variant="outlined"
              density="compact"
              class="mb-3"
            />
            
            <v-select
              v-model="settings.defaultView"
              :items="viewOptions"
              label="Default View"
              variant="outlined"
              density="compact"
            />
          </v-window-item>
          
          <v-window-item value="data">
            <v-select
              v-model="settings.kpiMetrics"
              :items="kpiOptions"
              label="Visible KPIs"
              variant="outlined"
              density="compact"
              multiple
              chips
              class="mb-3"
            />
            
            <v-select
              v-model="settings.chartType"
              :items="chartOptions"
              label="Default Chart Type"
              variant="outlined"
              density="compact"
            />
          </v-window-item>
          
          <v-window-item value="notifications">
            <v-switch
              v-model="settings.emailAlerts"
              label="Email Alerts"
              color="primary"
              class="mb-3"
            />
            
            <v-switch
              v-model="settings.pushNotifications"
              label="Push Notifications"
              color="primary"
              class="mb-3"
            />
            
            <v-slider
              v-model="settings.alertThreshold"
              label="Alert Threshold"
              min="0"
              max="100"
              step="5"
              thumb-label
              class="mb-3"
            />
          </v-window-item>
        </v-window>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="saveSettings">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const dialog = ref(false)
const activeTab = ref('display')

const settings = ref({
  darkMode: false,
  refreshInterval: 30,
  defaultView: 'executive',
  kpiMetrics: ['revenue', 'growth', 'customers'],
  chartType: 'line',
  emailAlerts: true,
  pushNotifications: false,
  alertThreshold: 75
})

const refreshOptions = [
  { title: '15 seconds', value: 15 },
  { title: '30 seconds', value: 30 },
  { title: '1 minute', value: 60 },
  { title: '5 minutes', value: 300 }
]

const viewOptions = [
  { title: 'Executive Summary', value: 'executive' },
  { title: 'Detailed Analytics', value: 'detailed' },
  { title: 'Risk Dashboard', value: 'risk' }
]

const kpiOptions = [
  { title: 'Revenue', value: 'revenue' },
  { title: 'Growth Rate', value: 'growth' },
  { title: 'Customers', value: 'customers' },
  { title: 'Retention', value: 'retention' }
]

const chartOptions = [
  { title: 'Line Chart', value: 'line' },
  { title: 'Bar Chart', value: 'bar' },
  { title: 'Area Chart', value: 'area' }
]

const saveSettings = () => {
  // Save to localStorage or API
  localStorage.setItem('stratosai-settings', JSON.stringify(settings.value))
  dialog.value = false
}

onMounted(() => {
  const saved = localStorage.getItem('stratosai-settings')
  if (saved) {
    settings.value = { ...settings.value, ...JSON.parse(saved) }
  }
})
</script>