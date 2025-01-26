import { defineConfig } from 'vite'
import inject from "@rollup/plugin-inject";
import viteReact from "@vitejs/plugin-react";


export const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `Assets/[name]${hash}.js`,
        chunkFileNames: `Assets/[name]${hash}.js`,
        assetFileNames: `Assets/[name]${hash}.[ext]`,
      },
      plugins: [
        inject({
          React: "react",
          exclude: "src/**",
        }),
      ],
    },
    commonjsOptions: { requireReturnsDefault: "preferred" },
  },
  plugins: [viteReact()],
})
