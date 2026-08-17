<template>
  <v-card class="chart-container" elevation="0">
    <div class="chart-header">
      <div class="chart-title">Predictive Analytics</div>
      <v-btn-toggle v-model="chartType" mandatory variant="outlined" size="x-small" density="compact">
        <v-btn value="revenue">Revenue</v-btn>
        <v-btn value="customers">Customers</v-btn>
      </v-btn-toggle>
    </div>

    <v-card-text class="pt-2">
      <Line :data="chartData" :options="chartOptions" :height="260" />
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
      data: chartType.value === 'revenue'
        ? [2.1, 2.3, 2.65, 2.85, null, null]
        : [15200, 15847, 16200, 16800, null, null],
      borderColor: '#3949AB',
      backgroundColor: 'rgba(57,73,171,0.08)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#3949AB',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      label: 'AI Prediction',
      data: chartType.value === 'revenue'
        ? [null, null, null, 2.85, 3.2, 3.6]
        : [null, null, null, 16800, 18200, 19500],
      borderColor: '#FF6B35',
      borderDash: [6, 4],
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#FF6B35',
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { family: 'Inter', size: 12 },
        color: '#94A3B8',
        padding: 16,
      }
    },
    tooltip: {
      backgroundColor: '#1E293B',
      titleColor: '#F1F5F9',
      bodyColor: '#94A3B8',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      padding: 12,
    }
  },
  scales: {
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      border: { display: false },
      ticks: { color: '#64748B', font: { family: 'Inter', size: 11 } }
    },
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#64748B', font: { family: 'Inter', size: 11 } }
    }
  }
}
</script>
