<template>
  <div class="changelog-page">
    <div class="page-header">
      <h1 class="page-title">Changelog</h1>
      <div class="header-controls">
        <div class="sort-controls">
          <select class="sort-select" v-model="sortOrder">
            <option value="desc">Terbaru ke Terlama</option>
            <option value="asc">Terlama ke Terbaru</option>
          </select>
        </div>
        <button class="btn-refresh" @click="refreshData" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Refresh
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="store.error" class="error-state">
      <i class="fas fa-exclamation-triangle error-icon"></i>
      <h3>Gagal Memuat Data</h3>
      <p>{{ store.error }}</p>
      <button class="btn-retry" @click="refreshData">Coba Lagi</button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Memuat changelog...</p>
    </div>

    <!-- Content -->
    <div v-else class="changelog-content">
      <div class="stats-bar" v-if="displayedChangelogs.length > 0">
        <span class="stat">Total: {{ displayedChangelogs.length }} update</span>
        <span class="stat">Terbaru: {{ latestUpdateDate }}</span>
      </div>

      <div class="changelog-list">
        <ChangelogCard 
          v-for="item in displayedChangelogs" 
          :key="item.id" 
          :item="item"
          @edit="$emit('edit', item)"
          @delete="$emit('delete', item.id)"
        />
        
        <div v-if="displayedChangelogs.length === 0" class="empty-state">
          <i class="fas fa-inbox empty-icon"></i>
          <h3>Belum ada changelog</h3>
          <p>Mulai dengan menambahkan update pertama Anda</p>
          <button class="btn-primary" @click="$emit('add-first')">
            Tambah Changelog Pertama
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useChangelogStore } from '@/stores/changelog'
import ChangelogCard from './ChangelogCard.vue'

const props = defineProps({
  changelogs: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete', 'add-first'])

const store = useChangelogStore()
const sortOrder = ref('desc')

// Fetch data saat komponen dimount
onMounted(() => {
  if (props.changelogs.length === 0) {
    refreshData()
  }
})

const displayedChangelogs = computed(() => {
  const sorted = [...props.changelogs].sort((a, b) => {
    if (sortOrder.value === 'desc') {
      return new Date(b.date) - new Date(a.date)
    } else {
      return new Date(a.date) - new Date(b.date)
    }
  })
  return sorted
})

const latestUpdateDate = computed(() => {
  if (props.changelogs.length === 0) return '-'
  const latest = [...props.changelogs].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  return new Date(latest.date).toLocaleDateString('id-ID')
})

const refreshData = async () => {
  try {
    await store.fetchChangelogs()
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}
</script>

<style scoped>
.header-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-refresh {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.btn-refresh:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fa-spin {
  animation: spin 1s linear infinite;
}

.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #64748b;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-primary {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

/* Style yang sudah ada sebelumnya... */
.error-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #dc2626;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.btn-retry {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.loading-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.loading-spinner {
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.sort-controls {
  display: flex;
  gap: 0.5rem;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  font-size: 0.875rem;
}

.changelog-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #d1d5db;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .header-controls {
    justify-content: space-between;
  }
  
  .stats-bar {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>