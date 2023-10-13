import { expect, Locator, Page } from "@playwright/test"

import { test } from "./fixtures"
import { ElementTimeout } from "./utils"

test.describe("Reactive Analytics", () => {
  const baseUrl = `${process.env.E2E_RA_WEB_BASE_URL}`
  let reactiveAnalyticsPage: Page
  let searchBar: Locator
  let suggestions: Locator

  test.beforeAll(async ({ reactiveAnalyticsPageRec }) => {
    reactiveAnalyticsPage = reactiveAnalyticsPageRec
    await reactiveAnalyticsPage.goto(baseUrl)

    searchBar = reactiveAnalyticsPage.getByPlaceholder(
      /Enter a stock, symbol, or currency pair.../,
    )
    suggestions = reactiveAnalyticsPage.getByRole("listbox")
  })

  test.beforeEach(async () => {
    await searchBar.clear()
  })

  test("Suggestions are displayed upon typing in search bar", async () => {
    await searchBar.pressSequentially("USD")
    await expect(suggestions).toBeVisible()
    await expect(suggestions).not.toContainText("No results found...", {
      timeout: ElementTimeout.AGGRESSIVE,
    })
    expect(
      (await suggestions.getByRole("option").all()).length,
    ).toBeGreaterThan(0)
  })

  test("Opens stock page stock selected from suggestions", async () => {
    await searchBar.pressSequentially("USD")
    const firstSuggestion = suggestions.getByRole("option").first()
    const firstSuggestionText = await firstSuggestion.textContent()

    await firstSuggestion.click()
    await reactiveAnalyticsPage.waitForURL(`${baseUrl}/stock/*`)
    await reactiveAnalyticsPage.waitForLoadState("networkidle")
    await expect(searchBar).toBeVisible()
    await expect(searchBar).toHaveValue(firstSuggestionText)
  })
})
