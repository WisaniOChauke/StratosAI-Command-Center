<template>
  <div class="skeleton-container">
    <div v-if="type === 'kpi'" class="skeleton-kpi">
      <div class="skeleton-header">
        <div class="skeleton-line w-60"></div>
        <div class="skeleton-circle"></div>
      </div>
      <div class="skeleton-value"></div>
      <div class="skeleton-line w-40"></div>
    </div>
    
    <div v-else-if="type === 'chart'" class="skeleton-chart">
      <div class="skeleton-line w-80 mb-4"></div>
      <div class="skeleton-chart-area">
        <div v-for="i in 6" :key="i" class="skeleton-bar" :style="{ height: `${Math.random() * 60 + 20}%` }"></div>
      </div>
    </div>
    
    <div v-else-if="type === 'insight'" class="skeleton-insight">
      <div class="skeleton-header">
        <div class="skeleton-circle"></div>
        <div class="skeleton-line w-70"></div>
      </div>
      <div class="skeleton-line w-100 mb-2"></div>
      <div class="skeleton-line w-80 mb-2"></div>
      <div class="skeleton-line w-60"></div>
    </div>
    
    <div v-else class="skeleton-default">
      <div class="skeleton-line w-80 mb-3"></div>
      <div class="skeleton-line w-60 mb-3"></div>
      <div class="skeleton-line w-90"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'kpi' | 'chart' | 'insight' | 'default'
}>()
</script>

<style scoped>
.skeleton-container {
  padding: 20px;
}

.skeleton-line, .skeleton-circle, .skeleton-value, .skeleton-bar {
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 25%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

.skeleton-line {
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.skeleton-value {
  height: 32px;
  width: 120px;
  margin: 16px 0;
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.skeleton-chart-area {
  display: flex;
  align-items: end;
  gap: 8px;
  height: 200px;
}

.skeleton-bar {
  flex: 1;
  min-height: 20px;
}

.w-40 { width: 40%; }
.w-60 { width: 60%; }
.w-70 { width: 70%; }
.w-80 { width: 80%; }
.w-90 { width: 90%; }
.w-100 { width: 100%; }
.mb-2 { margin-bottom: 8px; }
.mb-3 { margin-bottom: 12px; }
.mb-4 { margin-bottom: 16px; }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>