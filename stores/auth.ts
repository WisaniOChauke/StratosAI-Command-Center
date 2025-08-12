import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'executive' | 'manager' | 'analyst'
  permissions: string[]
  avatar?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    auditLog: [] as any[]
  }),

  getters: {
    hasRole: (state) => (role: string) => state.user?.role === role,
    hasPermission: (state) => (permission: string) => 
      state.user?.permissions.includes(permission) || false
  },

  actions: {
    login(credentials: { email: string; password: string }) {
      // Simulate authentication
      this.user = {
        id: '1',
        name: 'Executive User',
        email: credentials.email,
        role: 'executive',
        permissions: ['dashboard:view', 'reports:export', 'kpi:create']
      }
      this.isAuthenticated = true
      this.logAction('user_login', { email: credentials.email })
    },

    logout() {
      this.logAction('user_logout', { userId: this.user?.id })
      this.user = null
      this.isAuthenticated = false
    },

    logAction(action: string, data: any) {
      this.auditLog.push({
        id: Date.now().toString(),
        action,
        data,
        userId: this.user?.id,
        timestamp: new Date(),
        ip: '192.168.1.1'
      })
    }
  }
})