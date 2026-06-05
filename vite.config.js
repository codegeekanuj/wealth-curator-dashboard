import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^lodash\/(.*)/, replacement: 'lodash-es/$1' },
      { find: 'lodash', replacement: 'lodash-es' }
    ]
  },
})

