import { expect, Locator, Page } from "@playwright/test"

import { test } from "./fixtures"
import { ElementTimeout } from "./utils"

test.describe("Reactive Analytics", () => {
  const baseUrl = `${process.env.E2E_RA_WEB_BASE_URL}`
  let mainPage: Page
  let searchBar: Locator
  let suggestions: Locator

  test.beforeAll(async ({ reactiveAnalyticsPage }) => {
    mainPage = reactiveAnalyticsPage

    searchBar = mainPage.getByPlaceholder(
      /Enter a stock, symbol, or currency pair.../,
    )
    suggestions = mainPage.getByRole("listbox")
  })

  test.beforeEach(async () => {
    await mainPage.goto(baseUrl)
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

  test("Opens stock page from suggestions", async () => {
    await searchBar.pressSequentially("Ford")

    await expect(suggestions.getByText("Stock")).toBeVisible()
    await expect(suggestions.getByText("FX")).not.toBeVisible()

    const firstSuggestion = suggestions.getByRole("option").first()
    const firstSuggestionText = await firstSuggestion.textContent()
    await firstSuggestion.click()

    await mainPage.waitForURL(`${baseUrl}/stock/*`)
    await mainPage.waitForLoadState("networkidle")
    await expect(searchBar).toBeVisible()
    await expect(searchBar).toHaveValue(firstSuggestionText)
  })

  test("Opens FX page from suggestions", async () => {
    await searchBar.pressSequentially("GBP")

    await expect(suggestions.getByText("FX")).toBeVisible()
    await expect(suggestions.getByText("Stock")).not.toBeVisible()

    const firstSuggestion = suggestions.getByRole("option").first()
    const firstSuggestionText = await firstSuggestion.textContent()
    await firstSuggestion.click()

    await mainPage.waitForURL(`${baseUrl}/fx/*`)
    await mainPage.waitForLoadState("networkidle")
    await expect(searchBar).toBeVisible()
    await expect(searchBar).toHaveValue(firstSuggestionText)
  })
})
