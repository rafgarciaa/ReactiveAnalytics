import { getEnvironment } from '..'

afterEach(() => {
  vi.restoreAllMocks() // clear testing data after each test run
})

test('getEnvironment works', () => {
  const mockHost = 'https://dev-reactive-analytics.adaptivecluster.com/'
  const expected = 'dev'
  const windowSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({ ...window.location, host: mockHost })
  getEnvironment()
  expect(getEnvironment()).toBe(expected)
})

//should also simulate other environments
