<template>
  <v-card class="executive-card pa-5" elevation="0">
    <div class="d-flex align-center justify-space-between mb-4">
      <div class="section-label mb-0">Risk Assessment</div>
      <v-chip :color="overallRiskColor" variant="tonal" size="x-small" class="font-weight-semibold">
        {{ overallRiskLevel }} Risk
      </v-chip>
    </div>

    <div v-for="risk in riskMetrics" :key="risk.category" class="risk-row">
      <div class="risk-header">
        <span class="risk-name">{{ risk.category }}</span>
        <span class="risk-score" :class="`text-${risk.color}`">{{ risk.score }}/100</span>
      </div>
      <v-progress-linear
        :model-value="risk.score"
        :color="risk.color"
        height="4"
        rounded
        bg-color="rgba(255,255,255,0.06)"
      />
      <div class="text-caption mt-1" style="color: var(--text-muted)">{{ risk.trend }}</div>
    </div>

    <div class="d-flex gap-2 mt-4">
      <v-btn variant="outlined" color="error" size="x-small" @click="showRiskReport = true">
        Risk Report
      </v-btn>
      <v-btn variant="outlined" color="primary" size="x-small" @click="showMitigationPlans = true">
        Mitigation Plans
      </v-btn>
    </div>

    <!-- Risk Report Dialog -->
    <v-dialog v-model="showRiskReport" max-width="720">
      <v-card class="executive-card pa-2" elevation="0">
        <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
          <span class="text-h6 font-weight-semibold">Risk Report</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showRiskReport = false" />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="risk in detailedRisks" :key="risk.category" cols="12" md="6">
              <v-card variant="outlined" class="pa-4 rounded-lg" style="border-color: var(--border-subtle)">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span class="text-subtitle-2 font-weight-semibold">{{ risk.category }}</span>
                  <v-chip :color="getRiskColor(risk.score)" size="x-small" variant="tonal">{{ risk.score }}/100</v-chip>
                </div>
                <p class="text-caption mb-2" style="color: var(--text-secondary)">{{ risk.description }}</p>
                <ul class="text-caption pl-4" style="color: var(--text-muted)">
                  <li v-for="f in risk.factors" :key="f">{{ f }}</li>
                </ul>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" size="small" @click="showRiskReport = false">Close</v-btn>
          <v-btn color="primary" variant="tonal" size="small" @click="exportRiskReport">Export</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Mitigation Plans Dialog -->
    <v-dialog v-model="showMitigationPlans" max-width="760">
      <v-card class="executive-card pa-2" elevation="0">
        <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
          <span class="text-h6 font-weight-semibold">Mitigation Plans</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showMitigationPlans = false" />
        </v-card-title>
        <v-card-text>
          <v-expansion-panels variant="accordion" elevation="0">
            <v-expansion-panel v-for="plan in mitigationPlans" :key="plan.risk" elevation="0">
              <v-expansion-panel-title>
                <div class="d-flex align-center gap-2">
                  <v-chip :color="getPriorityColor(plan.priority)" size="x-small" variant="tonal">
                    {{ plan.priority }}
                  </v-chip>
                  <span class="text-body-2 font-weight-medium">{{ plan.risk }}</span>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-2 mb-3" style="color: var(--text-secondary)">{{ plan.strategy }}</p>
                <ul class="text-caption pl-4 mb-3" style="color: var(--text-secondary)">
                  <li v-for="a in plan.actions" :key="a">{{ a }}</li>
                </ul>
                <div class="d-flex gap-4 text-caption" style="color: var(--text-muted)">
                  <span>{{ plan.timeline }}</span>
                  <span>{{ plan.owner }}</span>
                  <span>{{ plan.budget }}</span>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" size="small" @click="showMitigationPlans = false">Close</v-btn>
          <v-btn color="primary" variant="tonal" size="small" @click="exportMitigationPlans">Export</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
const riskMetrics = [
  { category: 'Financial',   score: 25, color: 'success', trend: '↓ Improving' },
  { category: 'Operational', score: 45, color: 'warning', trend: '→ Stable' },
  { category: 'Market',      score: 65, color: 'error',   trend: '↑ Increasing' },
  { category: 'Compliance',  score: 15, color: 'success', trend: '↓ Improving' },
]

const overallRiskLevel = computed(() => {
  const avg = riskMetrics.reduce((s, r) => s + r.score, 0) / riskMetrics.length
  return avg > 60 ? 'High' : avg > 30 ? 'Medium' : 'Low'
})

const overallRiskColor = computed(() =>
  overallRiskLevel.value === 'High' ? 'error' : overallRiskLevel.value === 'Medium' ? 'warning' : 'success'
)

const showRiskReport = ref(false)
const showMitigationPlans = ref(false)

const detailedRisks = [
  { category: 'Financial Risk',   score: 25, description: 'Low exposure with strong cash flow management.', factors: ['Stable revenue streams', 'Diversified income', 'Strong cash reserves'] },
  { category: 'Operational Risk', score: 45, description: 'Moderate challenges requiring process optimization.', factors: ['Supply chain dependencies', 'Staff turnover', 'System reliability'] },
  { category: 'Market Risk',      score: 65, description: 'High volatility and competitive pressure in key segments.', factors: ['Competitive landscape', 'Market saturation', 'Economic uncertainty'] },
  { category: 'Compliance Risk',  score: 15, description: 'Excellent compliance record with proactive management.', factors: ['Regular audits', 'Updated policies', 'Staff training'] },
]

const mitigationPlans = [
  {
    risk: 'Market Risk — Competitive Pressure', priority: 'high',
    strategy: 'Differentiation through innovation and customer experience.',
    actions: ['Launch new product features', 'Enhance customer onboarding', 'Develop strategic partnerships', 'Invest in R&D'],
    timeline: '3–6 months', owner: 'Chief Strategy Officer', budget: '$500K'
  },
  {
    risk: 'Operational Risk — Process Efficiency', priority: 'medium',
    strategy: 'Streamline operations through automation.',
    actions: ['Implement workflow automation', 'Conduct process mapping', 'Train staff', 'Establish monitoring'],
    timeline: '2–4 months', owner: 'Chief Operating Officer', budget: '$200K'
  },
  {
    risk: 'Financial Risk — Cash Flow', priority: 'low',
    strategy: 'Maintain strong financial controls and diversify revenue.',
    actions: ['Advanced cash flow forecasting', 'Diversify customer base', 'Establish credit facilities', 'Regular assessments'],
    timeline: '1–3 months', owner: 'Chief Financial Officer', budget: '$100K'
  },
]

const getRiskColor = (score: number) => score >= 60 ? 'error' : score >= 40 ? 'warning' : 'success'
const getPriorityColor = (p: string) => p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'success'

const exportRiskReport = () => {
  const content = detailedRisks.map(r => `${r.category}: ${r.score}/100\n${r.description}`).join('\n\n')
  const blob = new Blob([`StratosAI Risk Report\n\n${content}`], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = `risk-report-${Date.now()}.txt`; a.click()
  URL.revokeObjectURL(url)
}

const exportMitigationPlans = () => {
  const content = mitigationPlans.map(p => `${p.risk}\n${p.strategy}\n${p.timeline} · ${p.owner} · ${p.budget}`).join('\n\n')
  const blob = new Blob([`StratosAI Mitigation Plans\n\n${content}`], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = `mitigation-${Date.now()}.txt`; a.click()
  URL.revokeObjectURL(url)
}
</script>
