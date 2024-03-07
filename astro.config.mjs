import { defineConfig, sharpImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://coderdiaz.com',
  image: {
    domains: ['*.coderdiaz.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.coderdiaz.com'},
    ],
    service: sharpImageService(),
  },
  trailingSlash: 'always',
  output: 'static',
  adapter: vercel({ imageService: true }),
  integrations: [react(), tailwind(), sitemap(), mdx()],
  redirects: {
    '/garden/como-he-construido-mi-sitio-web-con-nextjs': {
      status: 301,
      destination: '/'
    },
    '/garden/actualizacion-octubre': {
      status: 301,
      destination: '/jardin/actualizacion-octubre-2023/'
    },
    '/garden/2021-en-retrospectiva': {
      status: 301,
      destination: '/jardin/2021-en-retrospectiva'
    },
    '/academia-baile-aria': {
      status: 301,
      destination: '/academia-de-baile-aria'
    },
    '/crossfit-quiniela': {
      status: 301,
      destination: '/'
    },
    '/expanish-post': {
      status: 301,
      destination: '/'
    },
    '/expanish-sitio-web': {
      status: 301,
      destination: '/web-expanish'
    }
  }
});