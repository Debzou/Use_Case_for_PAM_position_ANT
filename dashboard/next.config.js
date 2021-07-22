// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://api:5000/:path*' // Proxy to Backend
        }
      ]
    },
    env: {
    },
}
