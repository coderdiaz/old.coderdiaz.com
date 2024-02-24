import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://coderdiaz.com',
  trailingSlash: 'always',
  integrations: [react(), tailwind(), sitemap()],
  redirects: {
    '/garden/como-he-construido-mi-sitio-web-con-nextjs': {
      status: 301,
      destination: '/',
    },
    '/garden/actualizacion-octubre': {
      status: 301,
      destination: '/jardin/actualizacion-octubre-2023/',
    },
    '/garden/2021-en-retrospectiva': {
      status: 301,
      destination: '/jardin/2021-en-retrospectiva',
    },
    '/academia-baile-aria': {
      status: 301,
      destination: '/academia-de-baile-aria',
    },
    '/crossfit-quiniela': {
      status: 301,
      destination: '/',
    },
    '/expanish-post': {
      status: 301,
      destination: '/',
    },
    '/expanish-sitio-web': {
      status: 301,
      destination: '/web-expanish',
    },
  },
});