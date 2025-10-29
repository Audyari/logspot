# Project Context

## Purpose
Logspot adalah aplikasi manajemen changelog yang memungkinkan tim untuk melacak dan mengkomunikasikan pembaruan produk dengan cara yang terstruktur dan mudah dipahami. Tujuan utamanya adalah:
- Menyediakan pusat dokumentasi perubahan produk yang terorganisir
- Meningkatkan transparansi tim dan pengguna
- Memudahkan pelacakan riwayat pembaruan produk

## Tech Stack
- **Frontend**:
  - Vue.js 3 (Composition API)
  - Pinia untuk state management
  - Vite sebagai build tool
  - CSS3 dengan pendekatan utility-first

- **Tools & Layanan**:
  - Vercel untuk deployment
  - GitHub untuk version control
  - ESLint & Prettier untuk kualitas kode

## Project Conventions

### Code Style
- Gunakan Composition API dengan `<script setup>`
- Nama komponen dalam format PascalCase (contoh: `ChangelogList.vue`)
- Gunakan koma di akhir (trailing commas) untuk object dan array
- Gunakan single quote untuk string
- 2 spasi untuk indentasi
- Sertakan komponen yang digunakan di bagian atas file
- Pisahkan logika bisnis ke dalam store Pinia

### Architecture Patterns
- **Komponen**:
  - Komponen diletakkan di folder `src/components`
  - Nama file komponen mencerminkan fungsionalitas (misal: `ChangelogList.vue`)
  - Komponen bersifat reusable dan menerima props dengan validasi

- **State Management**:
  - Gunakan Pinia untuk manajemen state global
  - Pisahkan store berdasarkan domain (contoh: `changelog.js`)
  - Gunakan actions untuk operasi async

- **Routing**:
  - Gunakan Vue Router untuk navigasi
  - Gunakan named routes untuk referensi yang lebih aman

### Testing Strategy
- Unit test untuk komponen dengan Vitest
- Test coverage minimal 80%
- Gunakan Testing Library untuk pengujian komponen
- Mock external dependencies saat testing

### Git Workflow
- Gunakan Git Flow
- Buat branch feature dari `develop`
- Gunakan conventional commits
- Lakukan code review sebelum merge ke develop
- Gunakan semantic versioning untuk release

## Domain Context
- Aplikasi ini berfokus pada manajemen changelog produk
- Setiap entri changelog memiliki:
  - Judul
  - Tanggal
  - Tipe (Fitur Baru, Peningkatan, Perbaikan)
  - Deskripsi
  - Versi (opsional)
- Data disimpan di localStorage untuk persistensi

## Important Constraints
- Aplikasi harus berjalan di browser modern terbaru
- Harus mendukung tampilan mobile dan desktop
- Performa harus tetap baik dengan banyak entri changelog
- Harus aksesibel (keyboard navigation, screen reader friendly)

## External Dependencies
- **UI**:
  - Font Awesome untuk ikon
  - Google Fonts (jika diperlukan)

- **Development Tools**:
  - Vite
  - ESLint
  - Prettier

## Getting Started
1. Clone repository
2. Install dependencies: `npm install`
3. Jalankan development server: `npm run dev`
4. Build untuk produksi: `npm run build`

## Deployment
Aplikasi dapat dideploy ke Vercel dengan konfigurasi default. Pastikan file `vercel.json` sudah sesuai.
