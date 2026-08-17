<template>
  <v-card class="kpi-card pa-5" elevation="0">
    <div class="d-flex align-start justify-space-between mb-4">
      <div class="kpi-icon-wrap" :style="{ background: iconBg }">
        <v-icon :color="iconColor" size="20">{{ kpiIcon }}</v-icon>
      </div>
      <v-chip
        :color="trendColor"
        variant="tonal"
        size="x-small"
        class="font-weight-semibold"
      >
        {{ changePrefix }}{{ Math.abs(kpi.change) }}%
      </v-chip>
    </div>

    <div class="kpi-value mb-1">{{ formattedValue }}</div>
    <div class="kpi-label">{{ kpi.title }}</div>
  </v-card>
</template>

<script setup lang="ts">
interface KPI {
  id: string
  title: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  format: 'currency' | 'percentage' | 'number'
  category: 'financial' | 'operational' | 'customer' | 'risk'
}

const props = defineProps<{ kpi: KPI }>()
const { formatValue } = useDashboardStore()

const formattedValue = computed(() => formatValue(props.kpi.value, props.kpi.format))

const trendColor = computed(() =>
  props.kpi.trend === 'up' ? 'success' : props.kpi.trend === 'down' ? 'error' : 'info'
)

const changePrefix = computed(() => props.kpi.change >= 0 ? '+' : '')

const categoryMeta: Record<string, { icon: string; color: string; bg: string }> = {
  financial: { icon: 'mdi-currency-usd', color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
  customer:  { icon: 'mdi-account-group-outline', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  operational: { icon: 'mdi-chart-line', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  risk:      { icon: 'mdi-shield-outline', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
}

const meta = computed(() => categoryMeta[props.kpi.category] ?? categoryMeta.financial)
const kpiIcon = computed(() => meta.value.icon)
const iconColor = computed(() => meta.value.color)
const iconBg = computed(() => meta.value.bg)
</script>
