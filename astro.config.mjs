import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: NODE_ENV === 'production'
    ? awsAmplify()
    : require('@astrojs/node').default({
      mode: "standalone"
    })
});
