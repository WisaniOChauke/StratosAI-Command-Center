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
  
  // Simulate export process
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate download
  const filename = `stratosai-export-${Date.now()}.${selectedFormat.value}`
  console.log(`Exporting ${selectedData.value.join(', ')} as ${selectedFormat.value}`)
  
  isExporting.value = false
  menuOpen.value = false
}
</script>