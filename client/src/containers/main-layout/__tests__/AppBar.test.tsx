import AppBar from '../AppBar'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/rt-theme/ThemeContext'
import { screenSize } from '@/rt-theme/mediaQueries'
import React from 'react'
import { SpyInstance } from 'vitest'

const renderComponent = () =>
  render(
    <ThemeProvider>
      <AppBar />
    </ThemeProvider>,
  )

describe('AppBar', () => {
  let widthSpy: SpyInstance
  beforeEach(() => {
    widthSpy = vi.spyOn(window, 'innerWidth', 'get')
  })
  test('logo should float up on mobile view', () => {
    widthSpy.mockReturnValue(screenSize.tabletL - 1)
    renderComponent()
    expect(screen.queryByTestId('top-logo')).toBeInTheDocument()
    expect(screen.queryByTestId('side-logo')).toBeNull()
  })
  test('logo should go to the side on desktop view', () => {
    widthSpy.mockReturnValue(screenSize.tabletL + 1)
    renderComponent()
    expect(screen.queryByTestId('top-logo')).toBeNull()
    expect(screen.queryByTestId('side-logo')).toBeInTheDocument()
  })
})
