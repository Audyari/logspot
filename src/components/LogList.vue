<!-- src/components/LogList.vue -->
<template>
  <div class="log-list">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Memuat data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="loadLogs" class="btn-retry">Coba Lagi</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="sortedLogs.length === 0" class="empty-state">
      <p>Belum ada log yang ditambahkan</p>
      <button @click="$emit('add-log')" class="btn-add">
        Tambah Log Pertama
      </button>
    </div>

    <!-- Logs List -->
    <div v-else class="logs-container">
      <div 
        v-for="log in sortedLogs" 
        :key="log.id" 
        class="log-card"
      >
        <div class="log-header">
          <h3>{{ log.version }}</h3>
          <span class="log-date">{{ formatDate(log.createdAt) }}</span>
        </div>
        
        <div class="log-body">
          <h4>{{ log.title }}</h4>
          <p>{{ log.description }}</p>
        </div>
        
        <div class="log-actions">
          <button 
            @click="handleEdit(log)" 
            class="btn-edit"
          >
            Edit
          </button>
          <button 
            @click="handleDelete(log.id)" 
            class="btn-delete"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      :is-open="confirmDialog.isOpen"
      :title="confirmDialog.title"
      :message="confirmDialog.message"
      @confirm="confirmDialog.handleConfirm"
      @cancel="confirmDialog.handleCancel"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { useLogspotStore } from '@/stores/logspotStore'
import { useConfirm } from '@/composables/useConfirm'
import ConfirmDialog from './ConfirmDialog.vue'

const store = useLogspotStore()
const { sortedLogs, isLoading, error } = storeToRefs(store)
const toast = useToast()
const confirmDialog = useConfirm()

const emit = defineEmits(['add-log', 'edit-log'])

onMounted(async () => {
  await store.loadLogs()
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleEdit = (log) => {
  emit('edit-log', log)
}

const handleDelete = async (id) => {
  const confirmed = await confirmDialog.confirm({
    title: 'Hapus Log',
    message: 'Apakah Anda yakin ingin menghapus log ini? Tindakan ini tidak dapat dibatalkan.'
  })

  if (!confirmed) return

  const result = await store.deleteLog(id)

  if (result.success) {
    toast.success('Log berhasil dihapus')
  } else {
    toast.error(result.error || 'Gagal menghapus log')
  }
}
</script>

<style scoped>
.log-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  text-align: center;
  padding: 60px 20px;
  color: #ef4444;
}

.btn-retry {
  margin-top: 16px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.btn-add {
  margin-top: 16px;
  padding: 12px 32px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
}

.btn-add:hover {
  background: #059669;
}

/* Logs Container */
.logs-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.log-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
}

.log-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.log-header h3 {
  margin: 0;
  color: #3b82f6;
  font-size: 18px;
}

.log-date {
  color: #9ca3af;
  font-size: 14px;
}

.log-body h4 {
  margin: 0 0 8px 0;
  color: #111827;
  font-size: 16px;
}

.log-body p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.log-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-edit,
.btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-edit {
  background: #eff6ff;
  color: #3b82f6;
}

.btn-edit:hover {
  background: #dbeafe;
}

.btn-delete {
  background: #fee;
  color: #ef4444;
}

.btn-delete:hover {
  background: #fecaca;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .log-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .log-actions {
    justify-content: stretch;
  }
  
  .btn-edit,
  .btn-delete {
    flex: 1;
  }
}
</style>