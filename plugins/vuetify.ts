import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#0D47A1',
    secondary: '#1565C0',
    accent: '#FF6F00',
    success: '#2E7D32',
    warning: '#F57C00',
    error: '#C62828',
    info: '#0277BD',
    surface: '#FFFFFF',
    background: '#FAFAFA',
    'surface-variant': '#F8F9FA',
    'on-surface': '#1A1A1A',
    'primary-lighten-1': '#1976D2',
    'primary-darken-1': '#01579B'
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#3949AB',
    secondary: '#5C6BC0',
    accent: '#FFD700',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    surface: '#1E293B',
    background: '#0F172A',
    'surface-variant': '#334155',
    'on-surface': '#F1F5F9',
    'primary-lighten-1': '#5C6BC0',
    'primary-darken-1': '#1A237E',
    'surface-bright': '#475569',
    'surface-light': '#64748B',
    'surface-variant-light': '#475569'
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        lightTheme,
        darkTheme
      }
    },
    defaults: {
      VCard: {
        elevation: 8,
        rounded: 'xl',
        style: 'backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1);'
      },
      VBtn: {
        rounded: 'xl',
        elevation: 4,
        style: 'text-transform: none; font-weight: 600; backdrop-filter: blur(10px);'
      },
      VAppBar: {
        elevation: 0,
        style: 'backdrop-filter: blur(20px); background: rgba(15, 23, 42, 0.8) !important;'
      }
    }
  })
  app.vueApp.use(vuetify)
})