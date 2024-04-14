import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() 

export default defineConfig({
  plugins: [react()],
  define: {
    __USUARIOS__: `"${process.env.USUARIOS}"`  ,
    __WEBSOCKET__: `"${process.env.WEBSOCKET}"`  ,
    __PEDIDOS__: `"${process.env.PEDIDOS}"`  ,
  },
})
