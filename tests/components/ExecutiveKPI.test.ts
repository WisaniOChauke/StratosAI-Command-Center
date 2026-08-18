import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ExecutiveKPI from '~/components/ExecutiveKPI.vue'

// Mock the store composable
vi.mock('~/stores/dashboard', () => ({
  useDashboardStore: () => ({
    formatValue: (value: number, format: string) => {
      if (format === 'currency') return `$${value.toLocaleString()}`
      if (format === 'percentage') return `${value}%`
      return value.toLocaleString()
    }
  })
}))

describe('ExecutiveKPI', () => {
  const mockKPI = {
    id: 'test',
    title: 'Test KPI',
    value: 1000,
    change: 5.5,
    trend: 'up' as const,
    format: 'currency' as const,
    category: 'financial' as const
  }

  it('renders KPI title and value', () => {
    const wrapper = mount(ExecutiveKPI, { props: { kpi: mockKPI } })
    expect(wrapper.text()).toContain('Test KPI')
    expect(wrapper.text()).toContain('$1,000')
  })

  it('renders positive change with + prefix', () => {
    const wrapper = mount(ExecutiveKPI, { props: { kpi: mockKPI } })
    expect(wrapper.text()).toContain('+5.5%')
  })

  it('renders negative change without + prefix', () => {
    const wrapper = mount(ExecutiveKPI, {
      props: { kpi: { ...mockKPI, change: -3.2, trend: 'down' as const } }
    })
    expect(wrapper.text()).toContain('-3.2%')
  })

  it('renders correct icon for financial category', () => {
    const wrapper = mount(ExecutiveKPI, { props: { kpi: mockKPI } })
    expect(wrapper.html()).toContain('mdi-currency-usd')
  })

  it('renders correct icon for customer category', () => {
    const wrapper = mount(ExecutiveKPI, {
      props: { kpi: { ...mockKPI, category: 'customer' as const } }
    })
    expect(wrapper.html()).toContain('mdi-account-group-outline')
  })
})
