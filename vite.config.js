import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config"; // Node >=17
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // 多页面打包配置
      input: {
        popup: resolve(__dirname, "index.html"),
        help: resolve(__dirname, "help.html")
      }
    }
  },
  plugins: [crx({ manifest })],
  // 根据启动服务的端口修改，否则 hmr 不生效
  server: {
    strictPort: true,
    port: 5175,
    hmr: {
      clientPort: 5175
    }
  }
});
