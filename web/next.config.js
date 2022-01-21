


module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Public',
        permanent: true,
      },
    ]
  },
}
