// src/composables/useConfirm.js
import { ref } from 'vue'

export function useConfirm() {
  const isOpen = ref(false)
  const message = ref('')
  const title = ref('Konfirmasi')
  let resolvePromise = null
  
  const confirm = (options = {}) => {
    return new Promise((resolve) => {
      title.value = options.title || 'Konfirmasi'
      message.value = options.message || 'Apakah Anda yakin?'
      isOpen.value = true
      resolvePromise = resolve
    })
  }
  
  const handleConfirm = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resolvePromise = null
    }
  }
  
  const handleCancel = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(false)
      resolvePromise = null
    }
  }
  
  return {
    isOpen,
    title,
    message,
    confirm,
    handleConfirm,
    handleCancel
  }
}