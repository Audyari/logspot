<template>
  <ErrorBoundary>
    <div id="app">
      <!-- Header tetap sama -->
      <Header :active-tab="activeTab" @tab-change="handleTabChange" />

      <main class="main-content">
        <div class="container">
          <!-- Tambahkan Test Button (HAPUS NANTI setelah test) -->
          <!-- <div v-if="showTestButtons" class="test-panel">
            <h3>🧪 Test Panel (Hapus setelah selesai test)</h3>
            <div class="test-buttons">
              <button @click="testSuccess" class="btn-test success">
                ✅ Test Success
              </button>
              <button @click="testError" class="btn-test error">
                ❌ Test Error
              </button>
              <button @click="testWarning" class="btn-test warning">
                ⚠️ Test Warning
              </button>
              <button @click="testConfirm" class="btn-test info">
                ❓ Test Confirm
              </button>

              <!-- Error Boundary Test -->
          <!-- <button @click="toggleErrorComponent" class="btn-test danger">
                💥 Test Error Boundary
              </button>
            </div>
            <button @click="showTestButtons = false" class="btn-hide">
              Sembunyikan Test Panel
            </button>
          </div>  -->

          <!-- Error Test Component -->
          <!-- <div v-if="showErrorComponent" class="error-test-container">
            <h3>Testing Error Boundary</h3>
            <ErrorTestComponent />
          </div> -->

          <!-- Komponen asli Anda -->
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

    <!-- TAMBAHKAN INI: Toast Container -->
    <ToastContainer />

    <!-- TAMBAHKAN INI: Confirm Dialog -->
    <ConfirmDialog
      :is-open="confirmDialog.isOpen.value"
      :title="confirmDialog.title.value"
      :message="confirmDialog.message.value"
      @confirm="confirmDialog.handleConfirm"
      @cancel="confirmDialog.handleCancel"
    />
  </ErrorBoundary>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useChangelogStore } from "./stores/changelog";
import Header from "./components/Header.vue";
import ChangelogList from "./components/ChangelogList.vue";
import ChangelogForm from "./components/ChangelogForm.vue";

// TAMBAHKAN INI: Import komponen baru
import ErrorBoundary from "./components/ErrorBoundary.vue";
import ToastContainer from "./components/ToastContainer.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";
import ErrorTestComponent from "./components/ErrorTestComponent.vue";
import { useToast } from "./composables/useToast";
import { useConfirm } from "./composables/useConfirm";

const activeTab = ref("view");
const editingItem = ref(null);
const store = useChangelogStore();

// TAMBAHKAN INI: Setup toast & confirm
const toast = useToast();
const confirmDialog = useConfirm();
const showTestButtons = ref(true); // Set false untuk hide test panel
const showErrorComponent = ref(false);

// Load data dari localStorage saat app dimulai
onMounted(() => {
  store.loadFromStorage();
});

const handleTabChange = (tab) => {
  activeTab.value = tab;
  editingItem.value = null;
};

const handleEdit = (item) => {
  editingItem.value = item;
  activeTab.value = "add";
};

// MODIFIKASI INI: Pakai confirm dialog yang sudah diupdate
const handleDelete = async (id) => {
  try {
    const confirmed = await confirmDialog.confirm({
      title: "Hapus Changelog",
      message: "Apakah Anda yakin ingin menghapus update ini? Tindakan ini tidak dapat dibatalkan."
    });

    if (confirmed) {
      store.deleteChangelog(id);
      toast.success("Update berhasil dihapus");
    }
  } catch (error) {
    console.error("Error in handleDelete:", error);
    toast.error("Terjadi kesalahan saat menghapus update");
  }
};

// MODIFIKASI INI: Tambahkan toast notification
const handleSubmit = (formData) => {
  try {
    if (editingItem.value) {
      store.updateChangelog(editingItem.value.id, formData);
      toast.success("Changelog berhasil diupdate!");
    } else {
      store.addChangelog(formData);
      toast.success("Changelog berhasil ditambahkan!");
    }
    activeTab.value = "view";
    editingItem.value = null;
  } catch (error) {
    toast.error("Gagal menyimpan changelog");
    console.error(error);
  }
};

const handleCancel = () => {
  activeTab.value = "view";
  editingItem.value = null;
};

// TAMBAHKAN INI: Test functions
const testSuccess = () => {
  toast.success("✅ Ini toast success! Data berhasil disimpan.");
};

const testError = () => {
  toast.error("❌ Ini toast error! Gagal menyimpan data.");
};

const testWarning = () => {
  toast.warning("⚠️ Ini toast warning! Perhatian diperlukan.");
};

const testConfirm = async () => {
  const confirmed = await confirmDialog.confirm({
    title: "Test Konfirmasi",
    message: "Apakah Anda yakin ingin melanjutkan tindakan ini?",
  });

  if (confirmed) {
    toast.success('Anda klik "Ya, Lanjutkan"');
  } else {
    toast.info('Anda klik "Batal"');
  }
};

const toggleErrorComponent = () => {
  showErrorComponent.value = !showErrorComponent.value;
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
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

/* TAMBAHKAN INI: Test Panel Styles */
.test-panel {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.error-test-container {
  background: #fff9db;
  border: 2px solid #ffd43b;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.test-panel h3 {
  margin-bottom: 16px;
  font-size: 18px;
}

.test-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.btn-test {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: white;
}

.btn-test:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-test.success {
  background: #10b981;
}

.btn-test.error {
  background: #ef4444;
}

.btn-test.warning {
  background: #f59e0b;
}

.btn-test.info {
  background: #3b82f6;
}

.btn-test.danger {
  background: #dc2626;
}

.btn-hide {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-hide:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .main-content {
    padding: 1rem 0;
  }

  .test-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
