<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <i class="fas fa-list-alt logo-icon"></i>
          <span class="logo-text">Logspot</span>
        </div>
        
        <nav class="nav-tabs">

          <!-- View Tab fungsi untuk melihat changelog belum ada -->
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'view' }"
            @click="$emit('tab-change', 'view')"
          >
            <i class="fas fa-list"></i>
            Lihat Changelog
          </button>

          <!-- Add Tab fungsi untuk menambah changelog baru -->
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'add' }"
            @click="$emit('tab-change', 'add')"
          >
            <i class="fas fa-plus"></i>
            Tambah Update
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['tab-change'])
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  color: #4f46e5;
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  background-color: #f1f5f9;
  border-radius: 8px;
  padding: 0.25rem;
}

.nav-tab {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #64748b;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-tab.active {
  background-color: white;
  color: #4f46e5;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.nav-tab:hover {
  background-color: #e2e8f0;
}
</style>