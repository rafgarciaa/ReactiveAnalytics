import React from "react"

import { IApolloContainerProps } from "@/common/IApolloContainerProps"
import { MarketSegment } from "@/containers/global-types"

import { FXTicker } from "./tickers/FXTicker"
import { StockTicker } from "./tickers/StockTicker"
import { useParams } from "react-router-dom"

const ApolloPriceTickerContainer: React.FunctionComponent<
  IApolloContainerProps
> = ({ market }) => {
  const id = useParams()['id'] || "";
  if (market === MarketSegment.FX.toLowerCase()) {
    return <FXTicker id={id} />
  }
  return <StockTicker id={id} />
}

export default ApolloPriceTickerContainer
