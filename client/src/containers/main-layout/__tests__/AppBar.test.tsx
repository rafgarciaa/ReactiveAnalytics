import AppBar from '../AppBar'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/rt-theme/ThemeContext'
import React from 'react'

const renderComponent = () =>
  render(
    <ThemeProvider>
      <AppBar />
    </ThemeProvider>,
  )

describe('AppBar', () => {
  test('both logos should be in the document', () => {
    renderComponent()
    expect(screen.getByTestId('bottom-logo')).toBeInTheDocument()
    expect(screen.getByTestId('side-logo')).toBeInTheDocument()
  })
})
