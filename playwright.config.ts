import { defineConfig, devices } from '@playwright/test';



export default defineConfig({

  testDir: './playwright/tests',

  /* Maximum time for one test case: 60 seconds */

  timeout: 60 * 1000,

  expect: { /* Maximum timeout for one assertion: 20 seconds */

    timeout: 20000,

  },

  /* Run all test files in parallel */

  fullyParallel: false,

  workers: 1,

  /* Fail the build on CI if you accidentally left test.only in the source code. */

  forbidOnly: !!process.env.CI,

  /* Retry on CI and staging to absorb Render latency */

  retries: 1,

  /* Opt out of parallel tests on CI if necessary */

  workers: process.env.CI ? 2 : undefined,

  /* Reporter configuration */

  reporter: [

    ['html', { outputFolder: 'playwright-report', open: 'never' }],

    ['list']

  ],

  /* Shared settings for all projects */use: {

    /* Base URL for storefront tests */

    baseURL: 'https://atqaa-medusa-storefront.vercel.app/vn',

    /* Global action timeout */

    actionTimeout: 30 * 1000,

    navigationTimeout: 45 * 1000,

    /* Headless mode */

    headless: true,

    /* Trace, Screenshot and Video diagnostic settings */

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

  },



  /* Multi-browser execution profiles */

  projects: [

    {

      name: 'chromium', use: { ...devices['Desktop Chrome'] },

    },

    {

      name: 'firefox',

      use: { ...devices['Desktop Firefox'] },

    },

  ],

});