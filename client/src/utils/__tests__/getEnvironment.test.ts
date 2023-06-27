import { getEnvironment } from "../getEnvironment"

describe("getEnvironment", () => {
  let mockHost: string
  const originalLocation = window.location
  afterEach(() => {
    vi.restoreAllMocks() // clear testing data after each test run
  })

  beforeAll(() => {
    vi.spyOn(window, "location", "get").mockImplementation(() => ({
      ...originalLocation,
      host: mockHost,
    }))
  })

  test("getEnvironment parses deployed environemnts", () => {
    mockHost = "https://dev-reactive-analytics.adaptivecluster.com/"
    getEnvironment()
    expect(getEnvironment()).toBe("dev")
  })

  test("getEnvironment parses localhost environment", () => {
    mockHost = "http://localhost:3005"
    getEnvironment()
    expect(getEnvironment()).toBe("local")
  })
})

//should also simulate other environments
