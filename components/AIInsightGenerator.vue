<template>
  <v-card class="ai-generator executive-card" elevation="0">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="primary">mdi-brain</v-icon>
      <span class="text-h6 font-weight-bold">AI Insight Generator</span>
      <v-spacer />
      <v-chip color="success" variant="tonal" size="small">
        <v-icon start size="12">mdi-lightning-bolt</v-icon>
        Neural Active
      </v-chip>
    </v-card-title>
    
    <v-card-text>
      <v-textarea
        v-model="query"
        label="Ask AI about your business data..."
        placeholder="e.g., What are the key revenue drivers this quarter?"
        variant="outlined"
        rows="3"
        class="mb-4"
      />
      
      <v-btn 
        @click="generateInsight" 
        :loading="isGenerating"
        color="primary"
        block
        class="mb-4"
      >
        Generate AI Insight
      </v-btn>
      
      <div v-if="currentInsight" class="ai-response">
        <div class="d-flex align-center mb-3">
          <v-avatar size="32" color="primary">
            <v-icon>mdi-robot</v-icon>
          </v-avatar>
          <div class="ml-3">
            <div class="font-weight-bold">StratosAI Assistant</div>
            <div class="text-caption text-medium-emphasis">{{ formatTime(currentInsight.timestamp) }}</div>
          </div>
          <v-spacer />
          <v-chip :color="confidenceColor" variant="tonal" size="small">
            {{ currentInsight.confidence }}% Confidence
          </v-chip>
        </div>
        
        <div class="insight-content pa-4 rounded-lg">
          <h4 class="mb-2">{{ currentInsight.title }}</h4>
          <p class="mb-3">{{ currentInsight.analysis }}</p>
          
          <div v-if="currentInsight.recommendations.length" class="recommendations">
            <h5 class="mb-2">Recommendations:</h5>
            <ul>
              <li v-for="rec in currentInsight.recommendations" :key="rec" class="mb-1">
                {{ rec }}
              </li>
            </ul>
          </div>
          
          <div class="d-flex justify-end mt-3">
            <v-btn variant="text" size="small" @click="saveInsight">
              <v-icon start>mdi-bookmark</v-icon>
              Save Insight
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface AIInsight {
  id: string
  title: string
  analysis: string
  recommendations: string[]
  confidence: number
  timestamp: Date
  query: string
}

const query = ref('')
const isGenerating = ref(false)
const currentInsight = ref<AIInsight | null>(null)

const confidenceColor = computed(() => {
  if (!currentInsight.value) return 'info'
  const confidence = currentInsight.value.confidence
  return confidence >= 90 ? 'success' : confidence >= 70 ? 'warning' : 'error'
})

const generateInsight = async () => {
  if (!query.value.trim()) return
  
  isGenerating.value = true
  
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate mock AI insight based on query
  const insights = [
    {
      title: "Revenue Growth Acceleration Opportunity",
      analysis: "Analysis of Q4 data reveals a 23% increase in customer acquisition velocity, primarily driven by digital channels. The correlation between marketing spend and conversion rates shows optimal ROI at current investment levels.",
      recommendations: [
        "Increase digital marketing budget by 15% to capitalize on momentum",
        "Focus on high-converting customer segments identified in analysis",
        "Implement predictive lead scoring to improve conversion rates"
      ],
      confidence: 87
    },
    {
      title: "Operational Efficiency Insights",
      analysis: "Machine learning analysis identifies bottlenecks in the customer onboarding process, with average completion time 34% above industry benchmarks. Process optimization could yield significant cost savings.",
      recommendations: [
        "Automate document verification steps",
        "Implement progressive onboarding workflow",
        "Deploy chatbot for common customer queries"
      ],
      confidence: 92
    }
  ]
  
  const randomInsight = insights[Math.floor(Math.random() * insights.length)]
  
  currentInsight.value = {
    id: Date.now().toString(),
    ...randomInsight,
    timestamp: new Date(),
    query: query.value
  }
  
  isGenerating.value = false
}

const saveInsight = () => {
  if (currentInsight.value) {
    // Save to dashboard store or local storage
    console.log('Saving insight:', currentInsight.value)
  }
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.ai-response {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
}

.insight-content {
  background: rgba(57, 73, 171, 0.1);
  border: 1px solid rgba(57, 73, 171, 0.2);
}

.recommendations ul {
  padding-left: 20px;
}

.recommendations li {
  margin-bottom: 4px;
}
</style>