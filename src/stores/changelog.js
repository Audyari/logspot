import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChangelogStore = defineStore('changelog', () => {
  const changelogs = ref([])
  const loading = ref(false)

  // Load dari localStorage
  const loadFromStorage = () => {
    const stored = localStorage.getItem('logspot-changelogs')
    if (stored) {
      changelogs.value = JSON.parse(stored)
    }
  }

  // Save ke localStorage
  const saveToStorage = () => {
    localStorage.setItem('logspot-changelogs', JSON.stringify(changelogs.value))
  }

  // Add new changelog
  const addChangelog = (item) => {
    const newItem = {
      ...item,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    changelogs.value.unshift(newItem)
    saveToStorage()
  }

  // Update changelog
  const updateChangelog = (id, updates) => {
    const index = changelogs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      changelogs.value[index] = { ...changelogs.value[index], ...updates }
      saveToStorage()
    }
  }

  // Delete changelog
  const deleteChangelog = (id) => {
    changelogs.value = changelogs.value.filter(item => item.id !== id)
    saveToStorage()
  }

  // Helper function
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Computed - sorted changelogs
  const sortedChangelogs = computed(() => {
    return [...changelogs.value].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    )
  })

  return {
    changelogs,
    loading,
    sortedChangelogs,
    loadFromStorage,
    addChangelog,
    updateChangelog,
    deleteChangelog
  }
})