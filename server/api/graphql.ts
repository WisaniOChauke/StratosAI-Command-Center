export default defineEventHandler(async (event) => {
  const schema = `
    type KPI {
      id: ID!
      title: String!
      value: Float!
      change: Float!
      trend: String!
    }
    
    type Query {
      kpis: [KPI!]!
    }
  `
  
  const resolvers = {
    kpis: () => [
      { id: '1', title: 'Revenue', value: 2847500, change: 12.5, trend: 'up' }
    ]
  }
  
  return { schema, resolvers }
})