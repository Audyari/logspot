// src/utils/storage.js

/**
 * Safe localStorage wrapper dengan error handling
 */
class Storage {
  /**
   * Simpan data ke localStorage
   * @param {string} key - Key untuk storage
   * @param {any} value - Value yang akan disimpan
   * @returns {boolean} - Success status
   */
  set(key, value) {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error)
      
      // Check jika storage penuh
      if (error.name === 'QuotaExceededError') {
        this.handleQuotaExceeded()
      }
      
      return false
    }
  }

  /**
   * Ambil data dari localStorage
   * @param {string} key - Key storage
   * @param {any} defaultValue - Default value jika tidak ada/error
   * @returns {any} - Data yang tersimpan atau default value
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      
      if (item === null) {
        return defaultValue
      }
      
      return JSON.parse(item)
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error)
      return defaultValue
    }
  }

  /**
   * Hapus item dari localStorage
   * @param {string} key - Key yang akan dihapus
   * @returns {boolean} - Success status
   */
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error)
      return false
    }
  }

  /**
   * Clear semua data localStorage
   * @returns {boolean} - Success status
   */
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  /**
   * Cek apakah localStorage available
   * @returns {boolean}
   */
  isAvailable() {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Handle ketika storage penuh
   */
  handleQuotaExceeded() {
    console.warn('localStorage quota exceeded!')
    // Bisa tambah logic untuk clear old data atau notify user
    alert('Penyimpanan penuh! Silakan hapus beberapa data lama.')
  }

  /**
   * Get ukuran storage yang terpakai (approximate)
   * @returns {number} - Size in bytes
   */
  getUsedSpace() {
    let total = 0
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }
    return total
  }
}

// Export singleton instance
export const storage = new Storage()

// Export class untuk testing
export default Storage