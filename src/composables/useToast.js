// src/composables/useToast.js
import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
  const add = (message, type = 'info', duration = 3000) => {
    const id = nextId++
    const toast = { id, message, type, duration }
    
    toasts.value.push(toast)
    
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
    
    return id
  }
  
  const remove = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const success = (message, duration) => {
    return add(message, 'success', duration)
  }
  
  const error = (message, duration) => {
    return add(message, 'error', duration)
  }
  
  const warning = (message, duration) => {
    return add(message, 'warning', duration)
  }
  
  const info = (message, duration) => {
    return add(message, 'info', duration)
  }
  
  const clear = () => {
    toasts.value = []
  }
  
  return {
    toasts,
    add,
    remove,
    success,
    error,
    warning,
    info,
    clear
  }
}