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
    expect(screen.getByTestId('top-logo').style.display).toBe('block')
    expect(screen.getByTestId('side-logo').style.display).toBe('none')
  })
  test('logo should go to the side on desktop view', () => {
    widthSpy.mockReturnValue(screenSize.tabletL + 1)
    renderComponent()
    expect(screen.getByTestId('top-logo').style.display).toBe('none')
    expect(screen.getByTestId('side-logo').style.display).toBe('block')
  })
})
