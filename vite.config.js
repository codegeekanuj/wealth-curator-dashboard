import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^es-toolkit\/compat\/(.*)/, replacement: path.resolve(__dirname, 'src/compat/$1.js') },
      { find: /^lodash\/(.*)/, replacement: 'lodash-es/$1' },
      { find: 'lodash', replacement: 'lodash-es' }
    ]
  },
})


