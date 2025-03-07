import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    /* SVGR */
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  // Old Homepage Url Redirect
  async redirects() {
    return [
      {
        source: '/donate',
        destination: '/donation',
        permanent: true, // 301 리다이렉트
      },
      {
        source: '/ko-kr/privacy-homepage',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/ko-kr/privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/ko-kr/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      // {
      //   source: '/blog/:slug',
      //   destination: '/posts/:slug', // 동적 경로도 지원
      //   permanent: true,
      // },
    ]
  },
  // info : Firebase Hosting 적용을 위한 설정
  output: 'export',
  images: {
    // info : Firebase Hosting 적용을 위해 필요
    unoptimized: true, // 정적 내보내기를 위해 필요
    // 외부 이미지를 사용하는 경우 도메인 추가
    domains: ['www.speedetail.com', 'speedetail-home.web.app'],
  },
  // info : Firebase Hosting 적용을 위해 필요
  trailingSlash: true,
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)
