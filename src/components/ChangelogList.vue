<template>
  <div class="changelog-page">
    <div class="page-header">
      <h1 class="page-title">Changelog</h1>
      <div class="sort-controls">
        <select class="sort-select" v-model="sortOrder" @change="handleSortChange">
          <option value="desc">Terbaru ke Terlama</option>
          <option value="asc">Terlama ke Terbatu</option>
        </select>
      </div>
    </div>

    <div class="changelog-list">
      <ChangelogCard 
        v-for="item in displayedChangelogs" 
        :key="item.id" 
        :item="item"
        @edit="$emit('edit', item)"
        @delete="$emit('delete', item.id)"
      />
      
      <div v-if="changelogs.length === 0" class="empty-state">
        <i class="fas fa-inbox empty-icon"></i>
        <h3>Belum ada changelog</h3>
        <p>Mulai dengan menambahkan update pertama Anda</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChangelogCard from './ChangelogCard.vue'

const props = defineProps({
  changelogs: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const sortOrder = ref('desc')

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

const handleSortChange = () => {
  // Sorting sudah dihandle oleh computed property
}
</script>

<style scoped>
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
</style>