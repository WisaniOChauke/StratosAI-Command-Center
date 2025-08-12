import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExecutiveKPI from '~/components/ExecutiveKPI.vue'

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

  it('renders KPI data correctly', () => {
    const wrapper = mount(ExecutiveKPI, {
      props: { kpi: mockKPI }
    })
    
    expect(wrapper.text()).toContain('Test KPI')
    expect(wrapper.text()).toContain('$1,000')
    expect(wrapper.text()).toContain('+5.5%')
  })

  it('shows correct trend icon', () => {
    const wrapper = mount(ExecutiveKPI, {
      props: { kpi: mockKPI }
    })
    
    expect(wrapper.find('.mdi-trending-up')).toBeTruthy()
  })
})