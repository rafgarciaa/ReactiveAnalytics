import React, { useCallback, useEffect, useState } from "react"

import { MarketSegment } from "@/containers/global-types"
import { useSearch, useSearchFocus } from "@/hooks"
import { getPlatformAsync, PlatformProvider } from "@/ra-platforms"
import { AsyncReturnType } from "@/utils"

import { IApolloContainerProps } from "../../common/IApolloContainerProps"
import { MainLayoutWrapper } from "../../common/StyledComponents"
import AppBar from "./AppBar"
import { CurrentSymbolLayout } from "./CurrentSymbolLayout"
import { PWABanner, PWAInstallBanner } from "./PWAInstallPrompt"

const SESSION = "PWABanner"

const MainLayout: React.FunctionComponent<
  IApolloContainerProps & { market: MarketSegment }
> = (props) => {
  const [banner, setBanner] = useState<string>(
    sessionStorage.getItem(SESSION) || PWABanner.NotSet,
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { currentSymbol } = useSearch()
  const { isFocused } = useSearchFocus()

  type Platform = AsyncReturnType<typeof getPlatformAsync>
  const [platform, setPlatform] = useState<Platform>()

  const updateBanner = useCallback(
    (value: PWABanner) => {
      setBanner(value)
      sessionStorage.setItem(SESSION, value)
    },
    [setBanner],
  )

  useEffect(() => {
    const getPlatform = async () => {
      const runningPlatform = await getPlatformAsync()
      setPlatform(runningPlatform)
    }
    getPlatform()
  }, [])

  if (!platform) {
    return <></>
  }

  return (
    <PlatformProvider value={platform}>
      <MainLayoutWrapper
        hasCurrentSymbol={!!currentSymbol}
        hasSearchFocus={isFocused}
      >
        <PWAInstallBanner
          banner={banner}
          updateBanner={updateBanner}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <AppBar />
        <CurrentSymbolLayout {...props} />
      </MainLayoutWrapper>
    </PlatformProvider>
  )
}

export default MainLayout
