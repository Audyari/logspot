import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// Setup Toast dengan options
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true,
  maxToasts: 3,
  newestOnTop: true
}

app.use(pinia)
app.use(Toast, toastOptions)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
  
  // Bisa kirim ke error tracking service
  // sendToErrorTracking(err, info)
}

app.mount('#app')