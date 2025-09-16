/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // add domains if you’ll load images from outside your repo
  },
  env: {
    BRAND_NAME: "Briyant Solèy Signo 1815",
    BRAND_COLORS: "Apricot Orange (#FFA500) & Black (#000000)",
    BRAND_SLOGAN: "Yon motè nèf, yon sèl kout klé san bri"
  }
}

module.exports = nextConfig
