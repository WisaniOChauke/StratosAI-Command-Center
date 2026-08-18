<template>
  <div class="skeleton-wrap">
    <!-- KPI -->
    <template v-if="type === 'kpi'">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="sk sk-icon" />
        <div class="sk" style="width: 48px; height: 20px; border-radius: 6px;" />
      </div>
      <div class="sk sk-value mb-2" />
      <div class="sk" style="width: 55%; height: 13px;" />
    </template>

    <!-- Chart -->
    <template v-else-if="type === 'chart'">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="sk" style="width: 140px; height: 16px;" />
        <div class="sk" style="width: 64px; height: 22px; border-radius: 6px;" />
      </div>
      <div class="sk-chart-bars">
        <div v-for="i in 6" :key="i" class="sk sk-bar" :style="{ height: (30 + i * 10) + '%' }" />
      </div>
    </template>

    <!-- Insight -->
    <template v-else-if="type === 'insight'">
      <div class="d-flex gap-2 align-center mb-3">
        <div class="sk" style="width: 48px; height: 18px; border-radius: 6px;" />
        <div class="sk" style="width: 64px; height: 18px; border-radius: 6px;" />
      </div>
      <div class="sk" style="width: 75%; height: 14px;" />
      <div class="sk mt-2" style="width: 100%; height: 12px;" />
      <div class="sk mt-2" style="width: 85%; height: 12px;" />
      <div class="sk mt-3" style="width: 100%; height: 3px; border-radius: 2px;" />
    </template>

    <!-- Default -->
    <template v-else>
      <div class="sk mb-3" style="width: 80%; height: 16px;" />
      <div class="sk mb-3" style="width: 60%; height: 14px;" />
      <div class="sk" style="width: 90%; height: 14px;" />
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ type?: 'kpi' | 'chart' | 'insight' | 'default' }>()
</script>

<style scoped>
.skeleton-wrap { padding: 20px; }

.sk {
  background: linear-gradient(
    90deg,
    var(--border-subtle) 25%,
    var(--border-medium) 50%,
    var(--border-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: 6px;
  display: block;
}

.sk-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
}

.sk-value {
  width: 120px;
  height: 32px;
}

.sk-chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 180px;
}

.sk-bar {
  flex: 1;
  min-height: 16px;
  border-radius: 4px 4px 0 0;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
