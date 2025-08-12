<template>
  <div 
    class="draggable-widget" 
    :class="{ 'is-dragging': isDragging }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="widget-header">
      <v-icon class="drag-handle">mdi-drag</v-icon>
      <span class="widget-title">{{ widget.title }}</span>
      <v-btn icon="mdi-close" variant="text" size="small" @click="$emit('remove')" />
    </div>
    
    <div class="widget-content">
      <component :is="widget.component" v-bind="widget.props" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Widget {
  id: string
  title: string
  component: string
  props: Record<string, any>
  position: { x: number; y: number }
  size: { width: number; height: number }
}

const props = defineProps<{
  widget: Widget
}>()

const emit = defineEmits<{
  move: [id: string, position: { x: number; y: number }]
  remove: []
}>()

const isDragging = ref(false)
let startPos = { x: 0, y: 0 }

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  
  startPos = { x: clientX, y: clientY }
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  
  const deltaX = clientX - startPos.x
  const deltaY = clientY - startPos.y
  
  emit('move', props.widget.id, {
    x: props.widget.position.x + deltaX,
    y: props.widget.position.y + deltaY
  })
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}
</script>

<style scoped>
.draggable-widget {
  position: absolute;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  cursor: move;
}

.is-dragging {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.widget-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 8px;
}

.drag-handle {
  cursor: grab;
  opacity: 0.6;
}

.widget-title {
  flex: 1;
  font-weight: 600;
}

.widget-content {
  padding: 16px;
}
</style>