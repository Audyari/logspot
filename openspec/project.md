# Project Context

## Purpose
LogSpot adalah aplikasi web untuk mencatat dan mengelola log aktivitas atau catatan harian dengan antarmuka yang sederhana dan mudah digunakan.

## Tech Stack
- Frontend:
  - Vue.js 3 (Composition API)
  - Vite (Build Tool)
  - Vue Router
  - Pinia (State Management)
  - Tailwind CSS (Styling)
  - Headless UI (Komponen UI yang dapat diakses)

## Project Conventions

### Code Style
- Gunakan ESLint dan Prettier untuk konsistensi kode
- Gunakan Composition API dengan `<script setup>`
- Gunakan TypeScript untuk type checking
- Gunakan camelCase untuk variabel dan fungsi
- Gunakan PascalCase untuk komponen
- Gunakan kebab-case untuk nama file komponen

### Architecture Patterns
- Komposisi berbasis komponen
- State management terpusat dengan Pinia
- Komposables untuk logika yang dapat digunakan kembali
- Layout-based routing dengan Vue Router

### Testing Strategy
- Unit testing dengan Vitest
- Component testing dengan Vue Test Utils
- Coverage minimum 80% untuk kode kritis

### Git Workflow
- Gunakan Git Flow untuk manajemen branch
- Commit message mengikuti Conventional Commits
- Pull request harus melewati code review
- Gunakan semantic versioning (semver) untuk tagging

## Domain Context
- Aplikasi ini dirancang untuk membantu pengguna mencatat aktivitas harian
- Fokus pada kemudahan penggunaan dan performa yang baik
- Dapat diakses secara offline dengan dukungan PWA

## Important Constraints
- Harus mendukung browser modern (Chrome, Firefox, Safari versi terbaru)
- Harus responsif dan dapat diakses di perangkat mobile
- Performa loading halaman harus di bawah 2 detik

## External Dependencies
- Vue.js Core
- Vite
- Pinia
- Vue Router
- Headless UI
- Tailwind CSS
- Heroicons (untuk ikon)
