<template>
  <div class="changelog-card">
    <div class="card-header">
      <h3 class="card-title">{{ item.title }}</h3>
      <div class="card-actions">
        <button class="btn btn-edit" @click="$emit('edit', item)">
          <i class="fas fa-edit"></i>
          Edit
        </button>
        <button class="btn btn-delete" @click="$emit('delete', item.id)">
          <i class="fas fa-trash"></i>
          Hapus
        </button>
      </div>
    </div>
    
    <div class="card-meta">
      <span class="badge" :class="badgeClass">
        {{ typeLabel }}
      </span>
      <span class="date">{{ formattedDate }}</span>
      <span v-if="item.version" class="version">v{{ item.version }}</span>
    </div>
    
    <p class="card-description">{{ item.description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const badgeClass = computed(() => {
  const classes = {
    'new': 'badge-new',
    'improved': 'badge-improved', 
    'fixed': 'badge-fixed'
  }
  return classes[props.item.type] || 'badge-new'
})

const typeLabel = computed(() => {
  const labels = {
    'new': 'Fitur Baru',
    'improved': 'Peningkatan',
    'fixed': 'Perbaikan'
  }
  return labels[props.item.type] || 'Fitur Baru'
})

const formattedDate = computed(() => {
  return new Date(props.item.date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.changelog-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
  border-left: 4px solid #4f46e5;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.btn-edit {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-edit:hover {
  background-color: #e5e7eb;
}

.btn-delete {
  background-color: #fef2f2;
  color: #dc2626;
}

.btn-delete:hover {
  background-color: #fee2e2;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-new {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-improved {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-fixed {
  background-color: #e0e7ff;
  color: #3730a3;
}

.date, .version {
  font-size: 0.875rem;
  color: #6b7280;
}

.card-description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}
</style>