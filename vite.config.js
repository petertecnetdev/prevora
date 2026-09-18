import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['prevora-mark.svg'],
      manifest: {
        name: 'Prevora',
        short_name: 'Prevora',
        description: 'Previsões verificáveis, probabilidades e reputação baseada em resultados.',
        theme_color: '#070812',
        background_color: '#070812',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'pt-BR',
        icons: [
          { src: '/prevora-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      }
    })
  ],
  build: {
    target: 'es2020',
    sourcemap: false
  }
})
