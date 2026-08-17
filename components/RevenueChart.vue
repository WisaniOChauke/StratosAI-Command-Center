<template>
  <v-card class="chart-container" elevation="0">
    <div class="chart-header">
      <div>
        <div class="chart-title">Revenue Analytics</div>
        <div class="text-caption mt-1" style="color: var(--text-muted)">Monthly performance vs forecast</div>
      </div>
      <v-chip color="success" variant="tonal" size="small">
        <v-icon start size="14">mdi-trending-up</v-icon>
        +12.5%
      </v-chip>
    </div>

    <v-card-text class="pt-2">
      <Line :data="chartData" :options="chartOptions" :height="260" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [2100000, 2300000, 2150000, 2650000, 2800000, 2847500],
      borderColor: '#3949AB',
      backgroundColor: 'rgba(57, 73, 171, 0.08)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3949AB',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
    {
      label: 'Forecast',
      data: [null, null, null, null, null, 2847500, 3200000],
      borderColor: '#FF6B35',
      backgroundColor: 'rgba(255, 107, 53, 0.06)',
      borderWidth: 2,
      borderDash: [6, 4],
      fill: false,
      tension: 0.4,
      pointBackgroundColor: '#FF6B35',
      pointRadius: 4,
    }
  ]
}

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
      callbacks: {
        label: (ctx: any) => {
          const v = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(ctx.parsed.y)
          return `  ${ctx.dataset.label}: ${v}`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: { color: 'rgba(255,255,255,0.04)' },
      border: { display: false },
      ticks: {
        color: '#64748B',
        font: { family: 'Inter', size: 11 },
        callback: (v: any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(v)
      }
    },
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#64748B', font: { family: 'Inter', size: 11 } }
    }
  }
}
</script>
