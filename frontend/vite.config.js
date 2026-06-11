import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Gera o build diretamente na pasta static do Spring Boot
    outDir: '../backend/src/main/resources/static',
    // Limpa a pasta antes de cada build para evitar arquivos obsoletos
    emptyOutDir: true,
  }
})