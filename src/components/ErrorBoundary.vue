<!-- src/components/ErrorBoundary.vue -->
<template>
  <div v-if="error" class="error-boundary">
    <div class="error-container">
      <h2>⚠️ Terjadi Kesalahan</h2>
      <p class="error-message">{{ error.message }}</p>
      <button @click="resetError" class="btn-reset">
        Coba Lagi
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  console.error('Error caught by boundary:', err)
  // Bisa kirim ke error tracking service (Sentry, etc)
  return false // Stop propagation
})

const resetError = () => {
  error.value = null
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;
}

.error-container {
  background: #fee;
  border: 2px solid #fcc;
  border-radius: 8px;
  padding: 30px;
  max-width: 500px;
  text-align: center;
}

.error-message {
  color: #c33;
  margin: 20px 0;
  font-family: monospace;
}

.btn-reset {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-reset:hover {
  background: #c53030;
}
</style>