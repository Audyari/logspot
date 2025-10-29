<template>
  <div class="test-container">
    <h2>🧪 Test Toast Notification</h2>
    <div class="button-group">
      <button @click="testSuccess" class="btn btn-success">
        Test Success
      </button>
      <button @click="testError" class="btn btn-error">
        Test Error
      </button>
      <button @click="testWarning" class="btn btn-warning">
        Test Warning
      </button>
      <button @click="testInfo" class="btn btn-info">
        Test Info
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const toast = useToast()

const testSuccess = () => {
  toast.success('✅ Ini pesan sukses!')
}

const testError = () => {
  toast.error('❌ Ini pesan error!')
}

const testWarning = () => {
  toast.warning('⚠️ Ini pesan warning!')
}

const testInfo = () => {
  toast.info('ℹ️ Ini pesan info!')
}
</script>

<style scoped>
.test-container {
  padding: 40px;
  text-align: center;
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-success {
  background: #10b981;
}

.btn-error {
  background: #ef4444;
}

.btn-warning {
  background: #f59e0b;
}

.btn-info {
  background: #3b82f6;
}
</style>