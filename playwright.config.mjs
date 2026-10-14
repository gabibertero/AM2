import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4321/AM2-segundoparcial/' },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321/AM2-segundoparcial/',
    reuseExistingServer: true,
  },
});
