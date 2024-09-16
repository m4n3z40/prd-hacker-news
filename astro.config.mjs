import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || 'http://localhost:4321',
  output: 'server',

  adapter: process.env.NODE_ENV === 'production'
    ? awsAmplify()
    : (await import('@astrojs/node')).default({ mode: "standalone" }),

  integrations: [sitemap()]
});
