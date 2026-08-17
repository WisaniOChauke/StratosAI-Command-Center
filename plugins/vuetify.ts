import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme = {
  dark: true,
  colors: {
    primary: '#3949AB',
    secondary: '#5C6BC0',
    accent: '#FF6B35',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    surface: '#1E293B',
    background: '#0F172A',
    'surface-variant': '#263348',
    'on-surface': '#F1F5F9',
    'on-background': '#F1F5F9',
  }
}

const lightTheme = {
  dark: false,
  colors: {
    primary: '#1A237E',
    secondary: '#283593',
    accent: '#FF6B35',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    'surface-variant': '#F1F5F9',
    'on-surface': '#0F172A',
    'on-background': '#0F172A',
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'darkTheme',
      themes: { darkTheme, lightTheme }
    },
    defaults: {
      VCard: {
        elevation: 0,
        rounded: 'lg',
      },
      VBtn: {
        rounded: 'lg',
        elevation: 0,
        style: 'text-transform: none; font-weight: 500; letter-spacing: 0;'
      },
      VChip: {
        rounded: 'md',
        elevation: 0,
      },
      VAppBar: {
        elevation: 0,
      }
    }
  })
  app.vueApp.use(vuetify)
})
