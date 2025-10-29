<template>
  <div id="app">
    <Header :active-tab="activeTab" @tab-change="handleTabChange" />
    
    <main class="main-content">
      <div class="container">
        <ChangelogList 
          v-if="activeTab === 'view'"
          :changelogs="store.sortedChangelogs"
          @edit="handleEdit"
          @delete="handleDelete"
        />
        
        <ChangelogForm 
          v-else-if="activeTab === 'add'"
          :editing-item="editingItem"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChangelogStore } from './stores/changelog'
import Header from './components/Header.vue'
import ChangelogList from './components/ChangelogList.vue'
import ChangelogForm from './components/ChangelogForm.vue'

const activeTab = ref('view')
const editingItem = ref(null)
const store = useChangelogStore()

// Load data dari localStorage saat app dimulai
onMounted(() => {
  store.loadFromStorage()
})

const handleTabChange = (tab) => {
  activeTab.value = tab
  editingItem.value = null
}

const handleEdit = (item) => {
  editingItem.value = item
  activeTab.value = 'add'
}

const handleDelete = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus update ini?')) {
    store.deleteChangelog(id)
  }
}

const handleSubmit = (formData) => {
  if (editingItem.value) {
    store.updateChangelog(editingItem.value.id, formData)
  } else {
    store.addChangelog(formData)
  }
  activeTab.value = 'view'
  editingItem.value = null
}

const handleCancel = () => {
  activeTab.value = 'view'
  editingItem.value = null
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  padding: 2rem 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .main-content {
    padding: 1rem 0;
  }
}
</style>