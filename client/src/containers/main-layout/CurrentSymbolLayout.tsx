import React, { useMemo } from "react"
import { Route, Routes } from "react-router-dom"

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
import { Stocks } from "./Markets"

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
  


  const renderedRoutes = useMemo(() => {
    return (
      <Routes>
          <Route path="/" element={<Stocks id={id}/> }/>
          {/*<Route path="/bond/:id?" element={<News/> }/>
          <Route path="/fx/:from?:to?" element={<Currencies/> }/>
          <Route path="/future/:id?" element={<News/> }/>
          <Route path="/index/:id?" element={<News/> }/>
    <Route path="/stock/:id?" element={<Stocks/> }/>*/}
      </Routes>
    )
  }, [])

  return (
    <WrapperContent>
      <MainSearchContent $hasPreviousSearch={previousSearch ?? false}>
        <SearchGridArea>
          <Search id={id} url={market} market={market} />
          {currentSymbol && <PriceTicker id={id} market={market} />}
        </SearchGridArea>
      </MainSearchContent>
      {renderedErrorMessage || renderedRoutes}
      <Footer hasNoSearch={!currentSymbol} />
    </WrapperContent>
  )
}
