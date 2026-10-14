import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4321/AM2/' },
  webServer: {
    command: 'npm run build && npx astro preview --ignore-lock',
    url: 'http://localhost:4321/AM2/',
    reuseExistingServer: true,
  },
});
