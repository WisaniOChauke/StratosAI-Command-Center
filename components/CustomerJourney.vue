<template>
  <v-card class="chart-container" elevation="4">
    <v-card-title class="text-h6 font-weight-bold">Customer Journey Analytics</v-card-title>
    
    <v-card-text>
      <div class="journey-flow mb-6">
        <div v-for="(stage, index) in journeyStages" :key="stage.name" class="journey-stage">
          <div class="stage-card" :class="stage.status">
            <div class="stage-number">{{ index + 1 }}</div>
            <h4 class="stage-title">{{ stage.name }}</h4>
            <div class="stage-metric">{{ stage.conversion }}%</div>
            <div class="stage-count">{{ stage.count.toLocaleString() }} users</div>
          </div>
          <v-icon v-if="index < journeyStages.length - 1" class="journey-arrow">mdi-arrow-right</v-icon>
        </div>
      </div>
      
      <v-row>
        <v-col cols="6">
          <v-card variant="tonal" color="success">
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold">73.2%</div>
              <div class="text-caption">Overall Conversion</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card variant="tonal" color="info">
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold">4.2</div>
              <div class="text-caption">Avg. Journey Days</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const journeyStages = [
  { name: 'Awareness', conversion: 100, count: 25000, status: 'excellent' },
  { name: 'Interest', conversion: 85, count: 21250, status: 'good' },
  { name: 'Consideration', conversion: 68, count: 17000, status: 'good' },
  { name: 'Purchase', conversion: 73, count: 12410, status: 'warning' },
  { name: 'Retention', conversion: 94, count: 11666, status: 'excellent' }
]
</script>

<style scoped>
.journey-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.journey-stage {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stage-card {
  text-align: center;
  padding: 16px;
  border-radius: 12px;
  min-width: 120px;
  border: 2px solid;
}

.stage-card.excellent { 
  border-color: #4CAF50; 
  background: rgba(76, 175, 80, 0.15);
  .v-theme--lightTheme & {
    background: rgba(76, 175, 80, 0.1);
    border-color: #2E7D32;
  }
}
.stage-card.good { 
  border-color: #2196F3; 
  background: rgba(33, 150, 243, 0.15);
  .v-theme--lightTheme & {
    background: rgba(33, 150, 243, 0.1);
    border-color: #1976D2;
  }
}
.stage-card.warning { 
  border-color: #FF9800; 
  background: rgba(255, 152, 0, 0.15);
  .v-theme--lightTheme & {
    background: rgba(255, 152, 0, 0.1);
    border-color: #F57C00;
  }
}

.stage-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1A237E;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  font-weight: bold;
  font-size: 12px;
  
  .v-theme--lightTheme & {
    background: #0D47A1;
    color: white;
  }
}

.stage-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.stage-metric { 
  font-size: 18px; 
  font-weight: bold; 
  color: #1A237E;
  
  .v-theme--lightTheme & {
    color: #0D47A1;
  }
}
.stage-count { 
  font-size: 12px; 
  color: #666;
  
  .v-theme--lightTheme & {
    color: #424242;
  }
}
.journey-arrow { 
  color: #1A237E;
  
  .v-theme--lightTheme & {
    color: #0D47A1;
  }
}
</style>