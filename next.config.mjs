/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // Outputs a Single-Page Application (SPA).
  //distDir: './dist', // Changes the build output directory to `./dist/`.
  //basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `/some-base-path`.
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
 
export default nextConfig