import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChangelogStore = defineStore('changelog', () => {
  // State
  const changelogs = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const sortedChangelogs = computed(() => {
    return [...changelogs.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  const getChangelogById = computed(() => (id) => {
    return changelogs.value.find(item => item.id === id)
  })

  // Actions - TAMBAHKAN fetchChangelogs YANG HILANG
  const fetchChangelogs = async () => {
    loading.value = true
    error.value = null
    try {
      // Simulasi loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Coba load dari localStorage dulu
      const stored = localStorage.getItem('changelogs')
      if (stored) {
        changelogs.value = JSON.parse(stored)
      } else {
        // Data dummy jika tidak ada data di localStorage
        changelogs.value = [
          {
            id: 1,
            title: 'Fitur Changelog Ditambahkan',
            description: 'Pengguna sekarang dapat melihat daftar perubahan dan update terbaru',
            type: 'new',
            date: '2024-01-15',
            version: '1.0.0'
          },
          {
            id: 2,
            title: 'Perbaikan Responsif Mobile',
            description: 'Memperbaiki tampilan pada perangkat mobile untuk pengalaman yang lebih baik',
            type: 'fixed',
            date: '2024-01-14',
            version: '0.9.2'
          }
        ]
        saveToStorage()
      }
    } catch (err) {
      error.value = 'Gagal memuat data changelog'
      console.error('Error fetching changelogs:', err)
    } finally {
      loading.value = false
    }
  }

  const loadFromStorage = () => {
    loading.value = true
    try {
      const stored = localStorage.getItem('changelogs')
      if (stored) {
        changelogs.value = JSON.parse(stored)
      }
    } catch (err) {
      error.value = 'Gagal memuat data dari storage'
      console.error('Error loading from storage:', err)
    } finally {
      loading.value = false
    }
  }

  const saveToStorage = () => {
    try {
      localStorage.setItem('changelogs', JSON.stringify(changelogs.value))
    } catch (err) {
      error.value = 'Gagal menyimpan data'
      console.error('Error saving to storage:', err)
    }
  }

  const addChangelog = (changelogData) => {
    loading.value = true
    try {
      const newChangelog = {
        id: Date.now(),
        ...changelogData,
        createdAt: new Date().toISOString()
      }
      changelogs.value.unshift(newChangelog)
      saveToStorage()
      error.value = null
      return newChangelog
    } catch (err) {
      error.value = 'Gagal menambahkan changelog'
      console.error('Error adding changelog:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateChangelog = (id, updatedData) => {
    loading.value = true
    try {
      const index = changelogs.value.findIndex(item => item.id === id)
      if (index !== -1) {
        changelogs.value[index] = { 
          ...changelogs.value[index], 
          ...updatedData,
          updatedAt: new Date().toISOString()
        }
        saveToStorage()
        error.value = null
        return changelogs.value[index]
      }
    } catch (err) {
      error.value = 'Gagal mengupdate changelog'
      console.error('Error updating changelog:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteChangelog = (id) => {
    loading.value = true
    try {
      const index = changelogs.value.findIndex(item => item.id === id)
      if (index !== -1) {
        const deletedItem = changelogs.value.splice(index, 1)[0]
        saveToStorage()
        error.value = null
        return deletedItem
      }
    } catch (err) {
      error.value = 'Gagal menghapus changelog'
      console.error('Error deleting changelog:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Reset error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    changelogs,
    loading,
    error,
    
    // Getters
    sortedChangelogs,
    getChangelogById,
    
    // Actions
    fetchChangelogs, // JANGAN LUPA EXPORT INI!
    loadFromStorage,
    addChangelog,
    updateChangelog,
    deleteChangelog,
    clearError,
    saveToStorage
  }
})