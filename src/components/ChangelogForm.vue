<template>
  <div class="form-page">
    <h1 class="page-title">{{ editingItem ? 'Edit Update' : 'Tambah Update Baru' }}</h1>
    
    <div class="card">
      <form @submit.prevent="handleSubmit" class="changelog-form">
        <div class="form-group">
          <label class="form-label" for="title">Judul Update *</label>
          <input 
            type="text" 
            id="title" 
            class="form-control" 
            v-model="formData.title"
            placeholder="Contoh: Menambahkan fitur ekspor data"
            required
          >
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="date">Tanggal *</label>
            <input 
              type="date" 
              id="date" 
              class="form-control" 
              v-model="formData.date"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="version">Versi (Opsional)</label>
            <input 
              type="text" 
              id="version" 
              class="form-control" 
              v-model="formData.version"
              placeholder="Contoh: 1.2.0"
            >
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Tipe Update *</label>
          <div class="radio-group">
            <label class="radio-option" v-for="type in typeOptions" :key="type.value">
              <input 
                type="radio" 
                class="radio-input" 
                :value="type.value" 
                v-model="formData.type"
              >
              <span class="radio-custom"></span>
              <span>{{ type.label }}</span>
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="description">Deskripsi *</label>
          <textarea 
            id="description" 
            class="form-control" 
            v-model="formData.description"
            placeholder="Jelaskan detail update ini..."
            rows="4"
            required
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="handleCancel"
          >
            <i class="fas fa-times"></i>
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save"></i>
            {{ editingItem ? 'Perbarui' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  editingItem: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  title: '',
  date: '',
  type: 'new',
  description: '',
  version: ''
})

const typeOptions = [
  { value: 'new', label: 'Fitur Baru' },
  { value: 'improved', label: 'Peningkatan' },
  { value: 'fixed', label: 'Perbaikan' }
]

// Reset form
const resetForm = () => {
  formData.value = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    type: 'new',
    description: '',
    version: ''
  }
}

// Handle form submission
const handleSubmit = () => {
  emit('submit', { ...formData.value })
  resetForm()
}

// Handle cancel
const handleCancel = () => {
  resetForm()
  emit('cancel')
}

// Watch for editing item changes
watch(() => props.editingItem, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
  } else {
    resetForm()
  }
}, { immediate: true })

// Initialize form
onMounted(() => {
  if (!props.editingItem) {
    resetForm()
  }
})
</script>

<style scoped>
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.changelog-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-input {
  display: none;
}

.radio-custom {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  position: relative;
  transition: all 0.2s;
}

.radio-input:checked + .radio-custom {
  border-color: #4f46e5;
}

.radio-input:checked + .radio-custom::after {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #4f46e5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
}
</style>