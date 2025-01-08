// @ts-check
import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
    env: {
      schema: {
        API_SECRET: envField.string({
          context: 'server',
          access: 'secret',
        }),
        API_KEY: envField.string({ 
          context: "client", 
          access: "public", 
          optional: true 
        }),
      }
    },
});