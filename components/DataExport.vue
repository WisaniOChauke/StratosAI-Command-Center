<template>
  <v-menu v-model="menuOpen" :close-on-content-click="false" min-width="280">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="outlined"
        size="small"
        prepend-icon="mdi-download-outline"
      >
        Export
      </v-btn>
    </template>

    <v-card class="executive-card pa-1" elevation="0">
      <v-card-title class="text-body-2 font-weight-semibold pa-3 pb-1">
        Export Data
      </v-card-title>

      <v-card-text class="pa-3 pt-2">
        <v-select
          v-model="selectedFormat"
          :items="exportFormats"
          label="Format"
          variant="outlined"
          density="compact"
          hide-details
          class="mb-3"
        />

        <v-select
          v-model="selectedData"
          :items="dataTypes"
          label="Data"
          variant="outlined"
          density="compact"
          multiple
          hide-details
          class="mb-3"
        />

        <div class="d-flex gap-2">
          <v-text-field
            v-model="dateRange.start"
            label="From"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
          />
          <v-text-field
            v-model="dateRange.end"
            label="To"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>
      </v-card-text>

      <v-card-actions class="pa-3 pt-0">
        <v-btn variant="text" size="small" @click="menuOpen = false">Cancel</v-btn>
        <v-spacer />
        <v-btn color="primary" variant="tonal" size="small" :loading="isExporting" @click="exportData">
          Export
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const selectedFormat = ref('csv')
const selectedData = ref(['kpis', 'insights'])
const isExporting = ref(false)
const dateRange = ref({
  start: new Date().toISOString().split('T')[0],
  end: new Date().toISOString().split('T')[0]
})

const exportFormats = [
  { title: 'CSV', value: 'csv' },
  { title: 'JSON', value: 'json' },
  { title: 'Excel (.xls)', value: 'xlsx' },
  { title: 'Text Report', value: 'txt' },
]

const dataTypes = [
  { title: 'KPI Metrics', value: 'kpis' },
  { title: 'AI Insights', value: 'insights' },
  { title: 'Revenue Data', value: 'revenue' },
  { title: 'Risk Assessment', value: 'risks' },
]

const exportData = async () => {
  isExporting.value = true
  try {
    const handlers: Record<string, () => void> = {
      csv: generateCSV,
      json: generateJSON,
      xlsx: generateExcel,
      txt: generateReport,
    }
    handlers[selectedFormat.value]?.()
  } finally {
    isExporting.value = false
    menuOpen.value = false
  }
}

const generateCSV = () => {
  const rows = [
    'Metric,Value,Change,Trend',
    'Monthly Revenue,$2847500,+12.5%,up',
    'Growth Rate,23.8%,+3.2%,up',
    'Active Customers,15847,-2.1%,down',
    'Customer Retention,94.2%,+1.8%,up',
  ]
  download(new Blob([rows.join('\n')], { type: 'text/csv' }), `export-${Date.now()}.csv`)
}

const generateJSON = () => {
  const data = {
    generated: new Date().toISOString(),
    kpis: [
      { name: 'Monthly Revenue', value: 2847500, change: 12.5, trend: 'up' },
      { name: 'Growth Rate', value: 23.8, change: 3.2, trend: 'up' },
      { name: 'Active Customers', value: 15847, change: -2.1, trend: 'down' },
      { name: 'Customer Retention', value: 94.2, change: 1.8, trend: 'up' },
    ]
  }
  download(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), `export-${Date.now()}.json`)
}

const generateExcel = () => {
  const rows = [
    'Metric\tValue\tChange\tTrend',
    'Monthly Revenue\t$2,847,500\t+12.5%\tup',
    'Growth Rate\t23.8%\t+3.2%\tup',
    'Active Customers\t15,847\t-2.1%\tdown',
    'Customer Retention\t94.2%\t+1.8%\tup',
  ]
  download(new Blob([rows.join('\n')], { type: 'text/tab-separated-values' }), `export-${Date.now()}.xls`)
}

const generateReport = () => {
  const content = `StratosAI Report — ${new Date().toLocaleString()}\n\n` +
    `Revenue: $2,847,500 (+12.5%)\nGrowth: 23.8% (+3.2%)\nCustomers: 15,847 (-2.1%)\nRetention: 94.2% (+1.8%)`
  download(new Blob([content], { type: 'text/plain' }), `report-${Date.now()}.txt`)
}

const download = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
</script>
