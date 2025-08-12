<template>
  <v-menu v-model="menuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="outlined"
        prepend-icon="mdi-download"
        class="font-weight-medium"
      >
        Export Data
      </v-btn>
    </template>
    
    <v-card min-width="300">
      <v-card-title class="text-subtitle-1 font-weight-bold">Export Options</v-card-title>
      
      <v-card-text>
        <v-select
          v-model="selectedFormat"
          :items="exportFormats"
          label="Format"
          variant="outlined"
          density="compact"
          class="mb-3"
        />
        
        <v-select
          v-model="selectedData"
          :items="dataTypes"
          label="Data Type"
          variant="outlined"
          density="compact"
          multiple
          chips
          class="mb-3"
        />
        
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="dateRange.start"
              label="Start Date"
              type="date"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="dateRange.end"
              label="End Date"
              type="date"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-card-actions>
        <v-btn @click="menuOpen = false">Cancel</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="exportData" :loading="isExporting">
          Export
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const selectedFormat = ref('xlsx')
const selectedData = ref(['kpis', 'insights'])
const isExporting = ref(false)
const dateRange = ref({
  start: new Date().toISOString().split('T')[0],
  end: new Date().toISOString().split('T')[0]
})

const exportFormats = [
  { title: 'Excel (.xlsx)', value: 'xlsx' },
  { title: 'CSV (.csv)', value: 'csv' },
  { title: 'PDF Report', value: 'pdf' },
  { title: 'JSON Data', value: 'json' }
]

const dataTypes = [
  { title: 'KPI Metrics', value: 'kpis' },
  { title: 'AI Insights', value: 'insights' },
  { title: 'Revenue Data', value: 'revenue' },
  { title: 'Customer Analytics', value: 'customers' },
  { title: 'Risk Assessment', value: 'risks' }
]

const exportData = async () => {
  isExporting.value = true
  
  try {
    if (selectedFormat.value === 'pdf') {
      await generatePDF()
    } else if (selectedFormat.value === 'csv') {
      generateCSV()
    } else if (selectedFormat.value === 'json') {
      generateJSON()
    } else {
      // Excel format
      generateExcel()
    }
  } catch (error) {
    console.error('Export failed:', error)
  }
  
  isExporting.value = false
  menuOpen.value = false
}

const generatePDF = async () => {
  // Simple PDF generation without external library
  const content = generateReportContent()
  const blob = new Blob([content], { type: 'text/plain' })
  downloadFile(blob, `stratosai-report-${Date.now()}.txt`)
}

const generateCSV = () => {
  const csvContent = [
    'Metric,Value,Change,Trend',
    'Monthly Revenue,$2847500,+12.5%,up',
    'Growth Rate,23.8%,+3.2%,up',
    'Active Customers,15847,-2.1%,down',
    'Customer Retention,94.2%,+1.8%,up'
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  downloadFile(blob, `stratosai-data-${Date.now()}.csv`)
}

const generateJSON = () => {
  const data = {
    timestamp: new Date().toISOString(),
    kpis: [
      { name: 'Monthly Revenue', value: 2847500, change: 12.5, trend: 'up' },
      { name: 'Growth Rate', value: 23.8, change: 3.2, trend: 'up' },
      { name: 'Active Customers', value: 15847, change: -2.1, trend: 'down' },
      { name: 'Customer Retention', value: 94.2, change: 1.8, trend: 'up' }
    ],
    insights: [
      { title: 'Revenue Growth', confidence: 87, priority: 'high' },
      { title: 'Market Expansion', confidence: 92, priority: 'high' }
    ]
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  downloadFile(blob, `stratosai-export-${Date.now()}.json`)
}

const generateExcel = () => {
  // Simple tab-separated format that Excel can open
  const content = [
    'StratosAI Command Center Report',
    `Generated: ${new Date().toLocaleString()}`,
    '',
    'KPI Metrics:',
    'Metric\tValue\tChange\tTrend',
    'Monthly Revenue\t$2,847,500\t+12.5%\tup',
    'Growth Rate\t23.8%\t+3.2%\tup',
    'Active Customers\t15,847\t-2.1%\tdown',
    'Customer Retention\t94.2%\t+1.8%\tup'
  ].join('\n')
  
  const blob = new Blob([content], { type: 'text/tab-separated-values' })
  downloadFile(blob, `stratosai-report-${Date.now()}.xls`)
}

const generateReportContent = () => {
  return `STRATOSAI COMMAND CENTER REPORT
${'='.repeat(40)}

Generated: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY
${'-'.repeat(20)}
• Monthly Revenue: $2,847,500 (+12.5%)
• Growth Rate: 23.8% (+3.2%)
• Active Customers: 15,847 (-2.1%)
• Customer Retention: 94.2% (+1.8%)

AI INSIGHTS
${'-'.repeat(20)}
• Revenue Acceleration Opportunity (87% confidence)
• Market Expansion Signal (92% confidence)

OPERATIONAL METRICS
${'-'.repeat(20)}
• System Uptime: 99.8%
• Response Time: 145ms
• Error Rate: 0.02%
• Throughput: 1,250 req/min

Report generated by StratosAI Command Center
`
}

const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>