<template>
  <div class="error-test-component">
    <h3>Error Test Component</h3>
    <p>This component is designed to demonstrate error boundaries.</p>
    <button @click="throwError" class="btn-error-test">Throw Error</button>
    <button @click="renderError" v-if="!showError" class="btn-render-error">Trigger Render Error</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showError = ref(false);

const throwError = () => {
  throw new Error('Error thrown from child component to test error boundary!');
};

const renderError = () => {
  showError.value = true;
};

// This will cause an error during rendering when showError is true
if (showError.value) {
  throw new Error('Error from render function to test error boundary!');
}
</script>

<style scoped>
.error-test-component {
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
  background-color: #f9f9f9;
}

.btn-error-test, .btn-render-error {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-error-test {
  background-color: #dc3545;
  color: white;
}

.btn-render-error {
  background-color: #ffc107;
  color: black;
}
</style>