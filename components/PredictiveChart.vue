<template>
  <v-card class="chart-container" elevation="4">
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h6 font-weight-bold">Predictive Analytics</span>
      <v-btn-toggle v-model="chartType" mandatory variant="outlined" size="small">
        <v-btn value="revenue">Revenue</v-btn>
        <v-btn value="customers">Customers</v-btn>
        <v-btn value="risk">Risk</v-btn>
      </v-btn-toggle>
    </v-card-title>
    
    <v-card-text>
      <Line :data="chartData" :options="chartOptions" :height="280" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'

const chartType = ref('revenue')

const chartData = computed(() => ({
  labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1+1', 'Q2+1'],
  datasets: [
    {
      label: 'Historical',
      data: chartType.value === 'revenue' ? [2.1, 2.3, 2.65, 2.85, null, null] : [15200, 15847, 16200, 16800, null, null],
      borderColor: '#1A237E',
      backgroundColor: 'rgba(26, 35, 126, 0.1)',
      borderWidth: 3,
      fill: true
    },
    {
      label: 'AI Prediction',
      data: chartType.value === 'revenue' ? [null, null, null, 2.85, 3.2, 3.6] : [null, null, null, 16800, 18200, 19500],
      borderColor: '#FF6B35',
      borderDash: [5, 5],
      borderWidth: 2,
      fill: false
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = chartType.value === 'revenue' 
            ? `$${context.parsed.y}M` 
            : `${context.parsed.y.toLocaleString()}`
          return `${context.dataset.label}: ${value}`
        }
      }
    }
  }
}
</script>