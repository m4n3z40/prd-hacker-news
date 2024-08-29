import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: process.env.NODE_ENV === 'production'
    ? awsAmplify()
    : (await import('@astrojs/node')).default({ mode: "standalone" })
});
