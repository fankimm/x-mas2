/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    TEST_KEY: process.env.TEST_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.SUPABASE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
  },
};

module.exports = nextConfig;
