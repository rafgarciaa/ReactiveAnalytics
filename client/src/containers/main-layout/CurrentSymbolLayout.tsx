import React, { useMemo } from "react"
import { Outlet} from "react-router-dom"
import { MarketSegment } from "@/containers/global-types"
import { PriceTicker } from "@/containers/price-ticker"
import { useSearch } from "@/hooks"

import {
  MainContent,
  MainSearchContent,
  ScrollableArea,
  SearchGridArea,
  WrapperContent,
} from "../../common/StyledComponents"
import { Search } from "../index"
import Footer from "./Footer"

export const CurrentSymbolLayout: React.FunctionComponent<
  { id: string, market: MarketSegment }
> = ({ id, market }) => {
  const { currentSymbol, errorMessage, previousSearch } = useSearch()

  const renderedErrorMessage: JSX.Element | null = useMemo(() => {
    if (!(currentSymbol && currentSymbol.id) && id) {
      return (
        <ScrollableArea>
          <MainContent>
            <span>{errorMessage}</span>
          </MainContent>
        </ScrollableArea>
      )
    }
    return null
  }, [currentSymbol, errorMessage, id])

  return (
    <WrapperContent>
      <MainSearchContent $hasPreviousSearch={previousSearch ?? false}>
        <SearchGridArea>
          <Search id={id} url={market} market={market} />
          {currentSymbol && <PriceTicker market={market} />}
        </SearchGridArea>
      </MainSearchContent>
      <Outlet/>
      <Footer hasNoSearch={!currentSymbol} />
    </WrapperContent>
  )
}
