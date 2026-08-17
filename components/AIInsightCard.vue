<template>
  <div class="ai-insight-item">
    <div class="d-flex align-start justify-space-between gap-3">
      <div class="flex-grow-1">
        <div class="d-flex align-center gap-2 mb-1">
          <v-chip :color="priorityColor" variant="tonal" size="x-small" class="font-weight-semibold">
            {{ insight.priority }}
          </v-chip>
          <span class="text-caption" style="color: var(--text-muted)">{{ insight.category }}</span>
        </div>
        <div class="insight-title">{{ insight.title }}</div>
        <div class="insight-desc">{{ insight.description }}</div>
        <div class="confidence-bar mt-2">
          <div class="fill" :style="{ width: insight.confidence + '%' }" />
        </div>
        <div class="text-caption mt-1" style="color: var(--text-muted)">
          {{ insight.confidence }}% confidence
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AIInsight {
  id: string
  title: string
  description: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  category: 'revenue' | 'operations' | 'market' | 'risk'
}

const props = defineProps<{ insight: AIInsight }>()

const priorityColor = computed(() =>
  props.insight.priority === 'high' ? 'error' : props.insight.priority === 'medium' ? 'warning' : 'info'
)
</script>
