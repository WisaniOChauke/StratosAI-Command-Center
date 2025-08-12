<template>
  <div v-if="hasPermission">
    <slot />
  </div>
  <div v-else-if="showFallback" class="access-denied">
    <v-card class="pa-6 text-center">
      <v-icon size="64" color="warning" class="mb-4">mdi-shield-lock</v-icon>
      <h3 class="text-h6 mb-2">Access Restricted</h3>
      <p class="text-body-2">You don't have permission to view this content.</p>
      <v-btn color="primary" @click="requestAccess">Request Access</v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
interface Props {
  role?: string[]
  permission?: string[]
  showFallback?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showFallback: true
})

const { user } = useAuthStore()

const hasPermission = computed(() => {
  if (!user.value) return false
  
  if (props.role?.length) {
    return props.role.includes(user.value.role)
  }
  
  if (props.permission?.length) {
    return props.permission.some(p => user.value.permissions.includes(p))
  }
  
  return true
})

const requestAccess = () => {
  console.log('Access request submitted')
}
</script>