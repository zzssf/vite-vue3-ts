import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import stylelintPlugin from "vite-plugin-stylelint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    stylelintPlugin({
      include: ["src/**/*.{vue,css,scss,less}"]
    })
  ]
})
