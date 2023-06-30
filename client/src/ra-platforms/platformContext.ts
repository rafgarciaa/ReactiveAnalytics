import React from "react"
import { useContext } from "react"

import BrowserPlatform from "./browser/browserPlatform"
import { Platform } from "./platform"

// default context is browser
const PlatformContext = React.createContext<Platform>(new BrowserPlatform())

export const { Provider: PlatformProvider } = PlatformContext

export function usePlatform() {
  return useContext(PlatformContext)
}
