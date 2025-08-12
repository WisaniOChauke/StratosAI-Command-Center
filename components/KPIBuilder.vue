<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" color="primary" prepend-icon="mdi-plus">
        Create Custom KPI
      </v-btn>
    </template>
    
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">
        Custom KPI Builder
      </v-card-title>
      
      <v-card-text>
        <v-stepper v-model="step" :items="steps">
          <template v-slot:item.1>
            <v-card-text>
              <v-text-field
                v-model="kpi.name"
                label="KPI Name"
                placeholder="e.g., Customer Lifetime Value"
                variant="outlined"
                class="mb-4"
              />
              
              <v-textarea
                v-model="kpi.description"
                label="Description"
                placeholder="Describe what this KPI measures..."
                variant="outlined"
                rows="3"
                class="mb-4"
              />
              
              <v-select
                v-model="kpi.category"
                :items="categories"
                label="Category"
                variant="outlined"
              />
            </v-card-text>
          </template>
          
          <template v-slot:item.2>
            <v-card-text>
              <v-select
                v-model="kpi.dataSource"
                :items="dataSources"
                label="Data Source"
                variant="outlined"
                class="mb-4"
              />
              
              <v-text-field
                v-model="kpi.formula"
                label="Formula"
                placeholder="e.g., SUM(revenue) / COUNT(customers)"
                variant="outlined"
                class="mb-4"
              />
              
              <v-select
                v-model="kpi.aggregation"
                :items="aggregations"
                label="Aggregation Method"
                variant="outlined"
              />
            </v-card-text>
          </template>
          
          <template v-slot:item.3>
            <v-card-text>
              <v-select
                v-model="kpi.format"
                :items="formats"
                label="Display Format"
                variant="outlined"
                class="mb-4"
              />
              
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="kpi.target"
                    label="Target Value"
                    type="number"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="kpi.trend"
                    :items="trendOptions"
                    label="Good Trend"
                    variant="outlined"
                  />
                </v-col>
              </v-row>
              
              <v-switch
                v-model="kpi.realTime"
                label="Real-time Updates"
                color="primary"
                class="mb-4"
              />
              
              <div class="kpi-preview pa-4 rounded-lg">
                <h4 class="mb-2">Preview</h4>
                <div class="d-flex align-items-center">
                  <div>
                    <div class="text-h4 font-weight-bold">{{ formatValue(sampleValue) }}</div>
                    <div class="text-caption">{{ kpi.name || 'Custom KPI' }}</div>
                  </div>
                  <v-spacer />
                  <v-chip color="success" variant="tonal">
                    +12.5%
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </template>
        </v-stepper>
      </v-card-text>
      
      <v-card-actions>
        <v-btn @click="dialog = false">Cancel</v-btn>
        <v-spacer />
        <v-btn v-if="step > 1" @click="step--">Back</v-btn>
        <v-btn 
          v-if="step < 3" 
          @click="step++" 
          color="primary"
          :disabled="!canProceed"
        >
          Next
        </v-btn>
        <v-btn 
          v-if="step === 3" 
          @click="createKPI" 
          color="primary"
          :disabled="!isValid"
        >
          Create KPI
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const dialog = ref(false)
const step = ref(1)

const steps = [
  { title: 'Basic Info', value: 1 },
  { title: 'Data Configuration', value: 2 },
  { title: 'Display Settings', value: 3 }
]

const kpi = ref({
  name: '',
  description: '',
  category: '',
  dataSource: '',
  formula: '',
  aggregation: '',
  format: 'number',
  target: 0,
  trend: 'up',
  realTime: false
})

const categories = [
  'Financial',
  'Customer',
  'Operational',
  'Marketing',
  'Sales',
  'Product'
]

const dataSources = [
  'Revenue Database',
  'Customer CRM',
  'Analytics Platform',
  'External API',
  'Manual Input'
]

const aggregations = [
  'Sum',
  'Average',
  'Count',
  'Maximum',
  'Minimum',
  'Median'
]

const formats = [
  { title: 'Number', value: 'number' },
  { title: 'Currency', value: 'currency' },
  { title: 'Percentage', value: 'percentage' },
  { title: 'Duration', value: 'duration' }
]

const trendOptions = [
  { title: 'Higher is Better', value: 'up' },
  { title: 'Lower is Better', value: 'down' },
  { title: 'Stable is Better', value: 'stable' }
]

const sampleValue = 125000

const canProceed = computed(() => {
  switch (step.value) {
    case 1:
      return kpi.value.name && kpi.value.category
    case 2:
      return kpi.value.dataSource && kpi.value.formula
    default:
      return true
  }
})

const isValid = computed(() => {
  return kpi.value.name && 
         kpi.value.category && 
         kpi.value.dataSource && 
         kpi.value.formula
})

const formatValue = (value: number) => {
  switch (kpi.value.format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    case 'percentage':
      return `${value}%`
    case 'duration':
      return `${value}h`
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
}

const createKPI = () => {
  console.log('Creating KPI:', kpi.value)
  // Add to dashboard store
  dialog.value = false
  
  // Reset form
  kpi.value = {
    name: '',
    description: '',
    category: '',
    dataSource: '',
    formula: '',
    aggregation: '',
    format: 'number',
    target: 0,
    trend: 'up',
    realTime: false
  }
  step.value = 1
}
</script>

<style scoped>
.kpi-preview {
  background: rgba(57, 73, 171, 0.1);
  border: 1px solid rgba(57, 73, 171, 0.2);
}
</style>