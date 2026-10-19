import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE is set by the GitHub Actions workflow (/repo-name/) for GitHub Pages.
export default defineConfig({ base: process.env.VITE_BASE || '/', plugins: [react()] })
