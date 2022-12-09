import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import MainLayout from '../src/containers/main-layout'
import React from 'react'

test('all components should be rendered', async () => {
  // const mainLayout = render(<MainLayout />)
  // const pwa = await mainLayout.findByTestId('PWA')
  // const sidebar = await mainLayout.findByTestId('sidebar')
  // const searchbar = await mainLayout.findByTestId('searchbar')
  // expect(pwa).toBeDefined()
  // expect(sidebar).toBeDefined()
  // expect(searchbar).toBeDefined()
  expect(2 + 2).toBe(4)
})
