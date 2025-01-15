// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://marvel-w8vq.onrender.com', //backend URL
        changeOrigin: true, // Change the origin of the request
        rewrite: (path) => path, 
      },
    },
  },
}
