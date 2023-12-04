import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default ({mode}) =>{
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
   return defineConfig({
        plugins: [react()],
        base: '/store',
       
        build: {
          rollupOptions: {
              output:{
                  manualChunks(id) {
                      if (id.includes('node_modules')) {
                          return id.toString().split('node_modules/')[1].split('/')[0].toString();
                      }
                  }
              }
          }
        }
      }
      )
}
