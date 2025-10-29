<template>
  <div>
    <button @click="causeError">🔥 Trigger Error</button>
  </div>
</template>

<script setup>
const causeError = () => {
  throw new Error('Ini error sengaja untuk test!')
}
</script>