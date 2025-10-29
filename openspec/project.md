# Project Context

## Purpose
Logspot adalah platform manajemen log dan analitik yang membantu developer untuk melacak, menganalisis, dan memantau log aplikasi secara real-time. Tujuan utamanya adalah menyediakan solusi yang mudah digunakan namun powerful untuk debugging dan monitoring aplikasi.

## Tech Stack
- **Frontend**: 
  - Next.js 14 dengan App Router
  - TypeScript
  - Tailwind CSS
  - React Query untuk manajemen state server
  - Zustand untuk state management client
  - Shadcn/UI untuk komponen UI

- **Backend**:
  - Node.js dengan Express
  - MongoDB untuk database
  - JWT untuk autentikasi
  - Winston untuk logging

- **Infrastruktur**:
  - Vercel untuk deployment frontend
  - Railway untuk backend
  - MongoDB Atlas untuk database

## Project Conventions

### Code Style
- Gunakan TypeScript secara ketat dengan strict mode
- Gunakan ESLint dan Prettier untuk konsistensi kode
- Gunakan konvensi penamaan camelCase untuk variabel dan fungsi
- Gunakan PascalCase untuk komponen React
- Gunakan UPPER_CASE untuk konstanta
- Gunakan prefix `use` untuk custom hooks
- Gunakan prefix `handle` untuk event handlers

### Architecture Patterns
- Feature-based folder structure
- Server Components untuk data fetching
- Client Components untuk interaktivitas
- Custom hooks untuk logika bisnis yang reusable
- API routes untuk backend endpoints

### Testing Strategy
- Unit testing dengan Jest dan React Testing Library
- Integration testing untuk komponen penting
- E2E testing dengan Cypress
- Minimal 80% code coverage

### Git Workflow
- Gunakan Git Flow
- Buat branch feature dari `develop`
- Gunakan conventional commits
- Lakukan code review sebelum merge ke develop
- Gunakan semantic versioning untuk release

## Domain Context
- Sistem ini menangani log dalam berbagai format (JSON, text, dll)
- Setiap log memiliki level (error, warn, info, debug)
- Log dapat difilter berdasarkan waktu, level, dan metadata
- Dukungan untuk alerting berdasarkan kriteria tertentu

## Important Constraints
- Harus mendukung minimal 10.000 log per detik
- Waktu respons API maksimal 200ms untuk 95% request
- Harus compliant dengan GDPR
- Harus mendukung multi-tenant

## External Dependencies
- Auth0 untuk autentikasi
- Sentry untuk error tracking
- MongoDB Atlas untuk database
- Vercel Analytics untuk analitik
- Cloudinary untuk penyimpanan aset
