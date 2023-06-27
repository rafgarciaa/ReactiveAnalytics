import AppBar from "../AppBar"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/rt-theme/ThemeContext"
import { screenSize } from "@/rt-theme/mediaQueries"
import React from "react"

const renderComponent = () =>
  render(
    <ThemeProvider>
      <AppBar />
    </ThemeProvider>,
  )

describe("AppBar", () => {
  let mockScreenSize: number
  beforeEach(() => {
    vi.spyOn(window, "innerWidth", "get").mockImplementation(
      () => mockScreenSize,
    )
  })
  test("logo should float up on mobile view", () => {
    mockScreenSize = screenSize.tabletL - 1
    renderComponent()
    expect(screen.queryByTestId("logo-side-label")).toBeInTheDocument()
    expect(screen.queryByTestId("logo-bottom-label")).toBeNull()
  })
  test("logo should go to the side on desktop view", () => {
    mockScreenSize = screenSize.tabletL + 1
    renderComponent()
    expect(screen.queryByTestId("logo-side-label")).toBeNull()
    expect(screen.queryByTestId("logo-bottom-label")).toBeInTheDocument()
  })
})
