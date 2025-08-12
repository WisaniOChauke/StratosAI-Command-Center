export const useWebSocket = () => {
  const socket = ref<any>(null)
  const isConnected = ref(false)
  const lastUpdate = ref<Date | null>(null)

  const connect = () => {
    if (process.client) {
      // Simulate WebSocket connection for demo
      socket.value = {
        emit: (event: string, data: any) => console.log('Emit:', event, data),
        on: (event: string, callback: Function) => {
          // Simulate real-time updates every 30 seconds
          if (event === 'dashboard-update') {
            setInterval(() => {
              callback({
                kpis: generateRandomKPIUpdates(),
                timestamp: new Date()
              })
            }, 30000)
          }
        }
      }
      isConnected.value = true
      lastUpdate.value = new Date()
    }
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value = null
      isConnected.value = false
    }
  }

  const generateRandomKPIUpdates = () => ({
    revenue: 2847500 + Math.random() * 100000 - 50000,
    growth: 23.8 + Math.random() * 2 - 1,
    customers: 15847 + Math.floor(Math.random() * 100 - 50),
    retention: 94.2 + Math.random() * 1 - 0.5
  })

  onMounted(() => connect())
  onUnmounted(() => disconnect())

  return {
    socket: readonly(socket),
    isConnected: readonly(isConnected),
    lastUpdate: readonly(lastUpdate),
    connect,
    disconnect
  }
}