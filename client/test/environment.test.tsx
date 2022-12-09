import { expect, test } from 'vitest'
import { getEnvironment } from '../src/utils'

test('all components should be rendered', async () => {
  expect(getEnvironment()).toBe('unknown')
})

//should also simulate other environments
