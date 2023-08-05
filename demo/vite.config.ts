import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { MICROGRAD_TS_BASE_DEMO_PATH } from './src/config/links'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: MICROGRAD_TS_BASE_DEMO_PATH,
})
