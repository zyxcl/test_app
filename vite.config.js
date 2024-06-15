import { defineConfig } from 'vite'
import path, { join } from 'path'

export default defineConfig({
  // 其他公用选项
  // 静态资源文件夹
  publicDir: 'public',
  // 环境变量
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
  },

  resolve: {
    // 配置别名
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  base: 'test_app',
  // 打包相关配置
  build: {
    // 出口目录
    outDir: 'build',
    // 资源文件夹
    assetsDir: 'assets',
    // 小于 10kb 自动转成 base64
    assetsInlineLimit: 10 * 1024,
    sourcemap: false,
    emptyOutDir: true,
    // 传给 rollup 的配置
    rollupOptions: {
      // 配置入口文件
      input: {
        index: join(__dirname, './index.html'),
        search: join(__dirname, './search.html'),
        detail: join(__dirname, './detail.html')
      },
      // 输出
      output: {
        chunkFileNames: 'js/[name]-[hash:8].js',
        entryFileNames: 'js/[name]-[hash:8].js',
        assetFileNames: chunkInfo => {
          const imageReg = /(png|gif|jpeg|svg|webp)$/
          const [, ext] = path.basename(chunkInfo.name).split('.')
          if (ext === 'css') {
            return `css/[name]-[hash:8].${ext}`
          } else if (imageReg.test(ext)) {
            return `images/[name]-[hash:8].${ext}`
          }
          return 'assets/[name]-[hash:8].[ext]'
        }
      }
    }
  },
  
  // 开发服务器相关配置
  server: {
    open: true,
    proxy: {
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    }
  }
})