<template>
  <v-dialog v-model="dialog" max-width="520">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-cog-outline" variant="text" size="small" />
    </template>

    <v-card class="executive-card pa-2" elevation="0">
      <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
        <span class="text-h6 font-weight-semibold">Settings</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="dialog = false" />
      </v-card-title>

      <v-card-text class="pa-4 pt-2">
        <v-tabs v-model="activeTab" density="compact" class="mb-4">
          <v-tab value="display">Display</v-tab>
          <v-tab value="data">Data</v-tab>
          <v-tab value="alerts">Alerts</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Display -->
          <v-window-item value="display">
            <div class="section-label">Appearance</div>
            <v-switch
              v-model="settings.darkMode"
              label="Dark mode"
              color="primary"
              density="compact"
              hide-details
              class="mb-3"
            />
            <div class="section-label mt-4">Refresh Interval</div>
            <v-select
              v-model="settings.refreshInterval"
              :items="refreshOptions"
              variant="outlined"
              density="compact"
              hide-details
              class="mb-3"
            />
            <div class="section-label mt-4">Default View</div>
            <v-select
              v-model="settings.defaultView"
              :items="viewOptions"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-window-item>

          <!-- Data -->
          <v-window-item value="data">
            <div class="section-label">Visible KPIs</div>
            <v-select
              v-model="settings.kpiMetrics"
              :items="kpiOptions"
              variant="outlined"
              density="compact"
              multiple
              chips
              hide-details
              class="mb-3"
            />
            <div class="section-label mt-4">Default Chart</div>
            <v-select
              v-model="settings.chartType"
              :items="chartOptions"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-window-item>

          <!-- Alerts -->
          <v-window-item value="alerts">
            <div class="section-label">Notifications</div>
            <v-switch
              v-model="settings.emailAlerts"
              label="Email alerts"
              color="primary"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-switch
              v-model="settings.pushNotifications"
              label="Push notifications"
              color="primary"
              density="compact"
              hide-details
              class="mb-4"
            />
            <div class="section-label">Alert Threshold</div>
            <v-slider
              v-model="settings.alertThreshold"
              min="0" max="100" step="5"
              thumb-label
              color="primary"
              hide-details
            />
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn variant="text" size="small" @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" variant="tonal" size="small" @click="saveSettings">Save</v-btn>
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
  { title: '5 minutes', value: 300 },
]

const viewOptions = [
  { title: 'Executive Summary', value: 'executive' },
  { title: 'Detailed Analytics', value: 'detailed' },
  { title: 'Risk Dashboard', value: 'risk' },
]

const kpiOptions = [
  { title: 'Revenue', value: 'revenue' },
  { title: 'Growth Rate', value: 'growth' },
  { title: 'Customers', value: 'customers' },
  { title: 'Retention', value: 'retention' },
]

const chartOptions = [
  { title: 'Line', value: 'line' },
  { title: 'Bar', value: 'bar' },
  { title: 'Area', value: 'area' },
]

const saveSettings = () => {
  localStorage.setItem('stratosai-settings', JSON.stringify(settings.value))
  dialog.value = false
}

onMounted(() => {
  const saved = localStorage.getItem('stratosai-settings')
  if (saved) settings.value = { ...settings.value, ...JSON.parse(saved) }
})
</script>
