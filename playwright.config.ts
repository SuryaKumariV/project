import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests/features', // Ensure this is the correct path to your tests
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://visionary-kangaroo-dfdd41.netlify.app/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  // Skip browser installation in development environment
  webServer: process.env.CI ? {
    command: 'npm run dev',
    url: 'https://visionary-kangaroo-dfdd41.netlify.app/',
    reuseExistingServer: !process.env.CI,
  } : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*(newClaim)\.spec\.ts/ // Ensure this matches your test files
    }
    // ,
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   testMatch: /.*(submitClaim|newClaim)\.spec\.ts/ // Ensure this matches your test files
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   testMatch: /.*(submitClaim|newClaim)\.spec\.ts/ // Ensure this matches your test files
    // }
  ],
});