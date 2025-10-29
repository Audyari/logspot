// src/stores/logspotStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/utils/storage'

export const useLogspotStore = defineStore('logspot', () => {
  // State
  const logs = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Constants
  const STORAGE_KEY = 'logspot_logs'
  
  // Computed
  const sortedLogs = computed(() => {
    return [...logs.value].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  })
  
  const totalLogs = computed(() => logs.value.length)
  
  // Actions
  
  /**
   * Load logs dari localStorage
   */
  const loadLogs = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulasi async untuk consistency
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const savedLogs = storage.get(STORAGE_KEY, [])
      logs.value = savedLogs
      
      return { success: true, data: savedLogs }
    } catch (err) {
      error.value = 'Gagal memuat data logs'
      console.error('Error loading logs:', err)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Tambah log baru
   */
  const addLog = async (logData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const newLog = {
        id: Date.now().toString(),
        ...logData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      logs.value.push(newLog)
      
      const saved = storage.set(STORAGE_KEY, logs.value)
      
      if (!saved) {
        throw new Error('Gagal menyimpan ke localStorage')
      }
      
      return { success: true, data: newLog }
    } catch (err) {
      error.value = 'Gagal menambahkan log'
      console.error('Error adding log:', err)
      
      // Rollback jika gagal
      logs.value = logs.value.filter(log => log.id !== newLog.id)
      
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Update log
   */
  const updateLog = async (id, updates) => {
    isLoading.value = true
    error.value = null
    
    // Backup untuk rollback
    const backup = [...logs.value]
    
    try {
      const index = logs.value.findIndex(log => log.id === id)
      
      if (index === -1) {
        throw new Error('Log tidak ditemukan')
      }
      
      logs.value[index] = {
        ...logs.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      const saved = storage.set(STORAGE_KEY, logs.value)
      
      if (!saved) {
        throw new Error('Gagal menyimpan perubahan')
      }
      
      return { success: true, data: logs.value[index] }
    } catch (err) {
      error.value = 'Gagal mengupdate log'
      console.error('Error updating log:', err)
      
      // Rollback
      logs.value = backup
      
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Hapus log dengan konfirmasi
   */
  const deleteLog = async (id) => {
    // Backup untuk rollback
    const backup = [...logs.value]
    const deletedLog = logs.value.find(log => log.id === id)
    
    if (!deletedLog) {
      return { success: false, error: 'Log tidak ditemukan' }
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      logs.value = logs.value.filter(log => log.id !== id)
      
      const saved = storage.set(STORAGE_KEY, logs.value)
      
      if (!saved) {
        throw new Error('Gagal menghapus log')
      }
      
      return { success: true, data: deletedLog }
    } catch (err) {
      error.value = 'Gagal menghapus log'
      console.error('Error deleting log:', err)
      
      // Rollback
      logs.value = backup
      
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Cari log berdasarkan ID
   */
  const getLogById = (id) => {
    return logs.value.find(log => log.id === id)
  }
  
  /**
   * Clear semua logs dengan konfirmasi
   */
  const clearAllLogs = async () => {
    const backup = [...logs.value]
    
    isLoading.value = true
    error.value = null
    
    try {
      logs.value = []
      
      const cleared = storage.set(STORAGE_KEY, [])
      
      if (!cleared) {
        throw new Error('Gagal menghapus semua logs')
      }
      
      return { success: true }
    } catch (err) {
      error.value = 'Gagal menghapus semua logs'
      console.error('Error clearing logs:', err)
      
      // Rollback
      logs.value = backup
      
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Filter logs berdasarkan kriteria
   */
  const filterLogs = (filterFn) => {
    return logs.value.filter(filterFn)
  }
  
  /**
   * Search logs
   */
  const searchLogs = (query) => {
    const lowerQuery = query.toLowerCase()
    return logs.value.filter(log => 
      log.version?.toLowerCase().includes(lowerQuery) ||
      log.title?.toLowerCase().includes(lowerQuery) ||
      log.description?.toLowerCase().includes(lowerQuery)
    )
  }
  
  return {
    // State
    logs,
    isLoading,
    error,
    
    // Computed
    sortedLogs,
    totalLogs,
    
    // Actions
    loadLogs,
    addLog,
    updateLog,
    deleteLog,
    getLogById,
    clearAllLogs,
    filterLogs,
    searchLogs
  }
})