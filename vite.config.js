import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins:[react(),VitePWA({
    registerType:'prompt',
    includeAssets:['prevora-mark.svg'],
    manifest:{name:'Prevora',short_name:'Prevora',description:'Previsões verificáveis, probabilidades e reputação baseada em resultados.',theme_color:'#070812',background_color:'#070812',display:'standalone',start_url:'/',scope:'/',lang:'pt-BR',categories:['news','productivity','social'],icons:[{src:'/prevora-mark.svg',sizes:'any',type:'image/svg+xml',purpose:'any maskable'}]},
    workbox:{navigateFallback:'/index.html',cleanupOutdatedCaches:true,clientsClaim:true,skipWaiting:false}
  })],
  build:{target:'es2020',sourcemap:false}
})