import { devices, PlaywrightTestConfig } from "@playwright/test"

import { TestTimeout } from "./e2e/utils"

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  /* Maximum time one test can run for. */
  timeout: TestTimeout.NORMAL,
  workers: 1,
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"], 
        channel: 'chrome',
        //Artifacts
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
        headless: true,
      },
    },
  ],
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
  ],
}

export default config
