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
  { id?: string, market?: MarketSegment }
> = ({ id, market }) => {
  const { currentSymbol, previousSearch } = useSearch()

  return (
    <WrapperContent>
      <MainSearchContent $hasPreviousSearch={previousSearch ?? false}>
        <SearchGridArea>
          <Search id={id} url={market} market={market || MarketSegment.STOCK} />
          {currentSymbol && <PriceTicker market={market} />}
        </SearchGridArea>
      </MainSearchContent>
      {id && <Outlet/>}
      <Footer hasNoSearch={!currentSymbol} />
    </WrapperContent>
  )
}
