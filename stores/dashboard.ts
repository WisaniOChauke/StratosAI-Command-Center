import { defineStore } from 'pinia'

interface KPI {
  id: string
  title: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  format: 'currency' | 'percentage' | 'number'
  category: 'financial' | 'operational' | 'customer' | 'risk'
}

interface AIInsight {
  id: string
  title: string
  description: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  category: 'revenue' | 'operations' | 'market' | 'risk'
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    kpis: [] as KPI[],
    insights: [] as AIInsight[],
    customKPIs: [] as KPI[],
    widgets: [] as any[],
    isLoading: false,
    lastUpdated: null as Date | null,
    realTimeEnabled: true,
    dashboardConfig: {
      layout: 'grid',
      autoRefresh: 30,
      theme: 'dark'
    },
    operationalMetrics: {
      systemUptime: 99.8,
      responseTime: 145,
      errorRate: 0.02,
      throughput: 1250
    },
    anomalies: [] as any[],
    forecasts: [] as any[]
  }),

  getters: {
    criticalInsights: (state) => 
      state.insights.filter(insight => insight.priority === 'high'),
    
    revenueKPIs: (state) => 
      state.kpis.filter(kpi => kpi.id.includes('revenue')),
    
    formattedLastUpdate: (state) => 
      state.lastUpdated?.toLocaleString() || 'Never'
  },

  actions: {
    async fetchDashboardData() {
      this.isLoading = true
      try {
        // Simulate premium executive data
        this.kpis = [
          {
            id: 'revenue',
            title: 'Monthly Revenue',
            value: 2847500,
            change: 12.5,
            trend: 'up',
            format: 'currency',
            category: 'financial'
          },
          {
            id: 'growth',
            title: 'Growth Rate',
            value: 23.8,
            change: 3.2,
            trend: 'up',
            format: 'percentage',
            category: 'financial'
          },
          {
            id: 'customers',
            title: 'Active Customers',
            value: 15847,
            change: -2.1,
            trend: 'down',
            format: 'number',
            category: 'customer'
          },
          {
            id: 'retention',
            title: 'Customer Retention',
            value: 94.2,
            change: 1.8,
            trend: 'up',
            format: 'percentage',
            category: 'customer'
          },
          {
            id: 'churn',
            title: 'Churn Rate',
            value: 5.8,
            change: -0.3,
            trend: 'up',
            format: 'percentage',
            category: 'risk'
          },
          {
            id: 'nps',
            title: 'Net Promoter Score',
            value: 67,
            change: 4.2,
            trend: 'up',
            format: 'number',
            category: 'customer'
          }
        ]

        this.insights = [
          {
            id: '1',
            title: 'Revenue Acceleration Opportunity',
            description: 'AI analysis indicates 18% revenue increase potential through strategic customer segmentation.',
            confidence: 87,
            priority: 'high',
            category: 'revenue'
          },
          {
            id: '2',
            title: 'Market Expansion Signal',
            description: 'Emerging market trends suggest optimal timing for European expansion within Q2.',
            confidence: 92,
            priority: 'high',
            category: 'market'
          }
        ]

        this.lastUpdated = new Date()
      } finally {
        this.isLoading = false
      }
    },

    formatValue(value: number, format: string): string {
      switch (format) {
        case 'currency':
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          }).format(value)
        case 'percentage':
          return `${value}%`
        default:
          return new Intl.NumberFormat('en-US').format(value)
      }
    },

    updateRealTimeData(data: any) {
      if (this.realTimeEnabled) {
        // Update KPIs with real-time data
        Object.keys(data).forEach(key => {
          const kpi = this.kpis.find(k => k.id === key)
          if (kpi && data[key]) {
            kpi.value = data[key]
          }
        })
        this.lastUpdated = new Date()
      }
    },

    toggleRealTime() {
      this.realTimeEnabled = !this.realTimeEnabled
    },

    addCustomKPI(kpi: KPI) {
      this.customKPIs.push({
        ...kpi,
        id: `custom_${Date.now()}`
      })
    },

    removeCustomKPI(id: string) {
      this.customKPIs = this.customKPIs.filter(kpi => kpi.id !== id)
    },

    updateWidget(id: string, updates: any) {
      const widget = this.widgets.find(w => w.id === id)
      if (widget) {
        Object.assign(widget, updates)
      }
    },

    exportDashboardConfig() {
      return {
        kpis: this.customKPIs,
        widgets: this.widgets,
        config: this.dashboardConfig,
        timestamp: new Date().toISOString()
      }
    },

    importDashboardConfig(config: any) {
      this.customKPIs = config.kpis || []
      this.widgets = config.widgets || []
      this.dashboardConfig = { ...this.dashboardConfig, ...config.config }
    },

    generateForecast(metric: string, periods: number = 6) {
      // Simulate ML forecasting
      const baseValue = this.kpis.find(k => k.id === metric)?.value || 1000000
      const forecast = []
      
      for (let i = 1; i <= periods; i++) {
        const trend = 0.05 + (Math.random() - 0.5) * 0.02
        const seasonality = Math.sin((i / 12) * 2 * Math.PI) * 0.1
        const noise = (Math.random() - 0.5) * 0.05
        
        const value = baseValue * Math.pow(1 + trend + seasonality + noise, i)
        forecast.push({
          period: i,
          value: Math.round(value),
          confidence: Math.max(0.6, 0.95 - (i * 0.05))
        })
      }
      
      return forecast
    }
  }
})