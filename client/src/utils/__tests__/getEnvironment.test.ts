import { SpyInstance } from 'vitest'
import { getEnvironment } from '../getEnvironment'

describe('getEnvironment', () => {
  let windowSpy: SpyInstance
  afterEach(() => {
    vi.restoreAllMocks() // clear testing data after each test run
  })

  beforeEach(() => {
    windowSpy = vi.spyOn(window, 'location', 'get')
  })

  test('getEnvironment parses deployed environemnts', () => {
    windowSpy.mockReturnValue({ ...window.location, host: 'https://dev-reactive-analytics.adaptivecluster.com/' })
    getEnvironment()
    expect(getEnvironment()).toBe('dev')
  })

  test('getEnvironment parses localhost environment', () => {
    windowSpy.mockReturnValue({ ...window.location, host: 'http://localhost:3005' })
    getEnvironment()
    expect(getEnvironment()).toBe('local')
  })
})

//should also simulate other environments
