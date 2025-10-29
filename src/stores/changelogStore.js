import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChangelogStore = defineStore('changelog', () => {
  // State
  const changelogs = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const getAllChangelogs = computed(() => changelogs.value)
  
  const getChangelogsByType = computed(() => (type) => {
    return changelogs.value.filter(item => item.type === type)
  })

  const getLatestChangelog = computed(() => {
    if (changelogs.value.length === 0) return null
    return [...changelogs.value].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  })

  // Actions
  const fetchChangelogs = async () => {
    loading.value = true
    error.value = null
    try {
      // Simulasi API call - nanti bisa diganti dengan axios/fetch
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Data dummy untuk testing
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
        },
        {
          id: 3,
          title: 'Optimasi Performance',
          description: 'Meningkatkan kecepatan loading halaman utama',
          type: 'improved',
          date: '2024-01-13',
          version: '0.9.1'
        }
      ]
    } catch (err) {
      error.value = 'Gagal memuat data changelog'
      console.error('Error fetching changelogs:', err)
    } finally {
      loading.value = false
    }
  }

  const addChangelog = (newChangelog) => {
    const id = Math.max(0, ...changelogs.value.map(item => item.id)) + 1
    changelogs.value.unshift({
      id,
      ...newChangelog,
      date: new Date().toISOString().split('T')[0]
    })
  }

  const updateChangelog = (id, updatedData) => {
    const index = changelogs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      changelogs.value[index] = { ...changelogs.value[index], ...updatedData }
    }
  }

  const deleteChangelog = (id) => {
    const index = changelogs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      changelogs.value.splice(index, 1)
    }
  }

  return {
    // State
    changelogs,
    loading,
    error,
    
    // Getters
    getAllChangelogs,
    getChangelogsByType,
    getLatestChangelog,
    
    // Actions
    fetchChangelogs,
    addChangelog,
    updateChangelog,
    deleteChangelog
  }
})