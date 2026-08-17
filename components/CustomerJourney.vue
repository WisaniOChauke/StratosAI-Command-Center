<template>
  <v-card class="executive-card" elevation="0">
    <div class="chart-header">
      <div>
        <div class="chart-title">Customer Journey</div>
        <div class="text-caption mt-1" style="color: var(--text-muted)">Funnel conversion analysis</div>
      </div>
      <div class="d-flex gap-3">
        <div class="text-center">
          <div class="text-subtitle-1 font-weight-bold text-success">73.2%</div>
          <div class="text-caption" style="color: var(--text-muted)">Conversion</div>
        </div>
        <div class="text-center">
          <div class="text-subtitle-1 font-weight-bold">4.2d</div>
          <div class="text-caption" style="color: var(--text-muted)">Avg. Journey</div>
        </div>
      </div>
    </div>

    <v-card-text>
      <div class="journey-flow">
        <template v-for="(stage, i) in journeyStages" :key="stage.name">
          <div class="journey-stage">
            <div class="stage-card">
              <div class="stage-num">{{ i + 1 }}</div>
              <div class="stage-name">{{ stage.name }}</div>
              <div class="stage-pct">{{ stage.conversion }}%</div>
              <div class="stage-users">{{ stage.count.toLocaleString() }}</div>
            </div>
          </div>
          <v-icon v-if="i < journeyStages.length - 1" size="16" style="color: var(--text-muted)">
            mdi-chevron-right
          </v-icon>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const journeyStages = [
  { name: 'Awareness',      conversion: 100, count: 25000 },
  { name: 'Interest',       conversion: 85,  count: 21250 },
  { name: 'Consideration',  conversion: 68,  count: 17000 },
  { name: 'Purchase',       conversion: 73,  count: 12410 },
  { name: 'Retention',      conversion: 94,  count: 11666 },
]
</script>
