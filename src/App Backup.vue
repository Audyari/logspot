<!-- src/App.vue -->
<template>
  <ErrorBoundary>
    <div id="app">
      <header class="app-header">
        <h1>📝 Logspot</h1>
        <p>Changelog Management System</p>
      </header>

      <main class="app-main">
        <router-view v-if="useRouter" />
        <slot v-else />
        <!-- Komponen Anda di sini -->
      </main>

      <footer class="app-footer">
        <p>&copy; 2025 Logspot v1.0.0</p>
      </footer>
    </div>

    <!-- Toast Container (PENTING!) -->
    <ToastContainer />
  </ErrorBoundary>
</template>

<script setup>
import { ref } from 'vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ToastContainer from './components/ToastContainer.vue'

// Check apakah pakai router
const useRouter = ref(false) // Set true jika pakai Vue Router
</script>

<style>
/* Reset & Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    'Helvetica Neue', Arial, sans-serif;
  background: #f9fafb;
  color: #111827;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 32px;
  margin-bottom: 8px;
}

.app-header p {
  opacity: 0.9;
  font-size: 14px;
}

.app-main {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 24px;
  }
  
  .app-main {
    padding: 20px 16px;
  }
}
</style>