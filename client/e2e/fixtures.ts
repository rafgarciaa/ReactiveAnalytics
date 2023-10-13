import { chromium, test as base } from "@playwright/test"

export const test = base.extend({
  browser: async ({}, use) => {
    const browser = await chromium.launch()
    await use(browser)
  },
  context: async ({ browser }, use) => {
    try {
      const contexts = browser.contexts()
      if (contexts.length !== 1) {
        throw Error(
          `Unexpected Context(s): Expected 1, Found ${contexts.length}`,
        )
      }
      await use(contexts[0])
    } catch (e) {
      const context = await browser.newContext()
      use(context)
    }
  },
  reactiveAnalyticsPageRec: async ({ context }, use) => {
    const contextPages = context.pages()
    const mainWindow =
      contextPages.length > 0 ? contextPages[0] : await context.newPage()
    use(mainWindow)
  },
})
