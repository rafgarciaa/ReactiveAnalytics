import { useSubscription } from "@apollo/client"
import React from "react"

import { StockPrice } from "@/containers/price-ticker/components"

import AdaptiveLoader from "../../common/AdaptiveLoader"
import MarketQuery from "./graphql/MarketSubscription.graphql"
import {
  onMarketSubscription,
  onMarketSubscriptionVariables,
} from "./graphql/types/onMarketSubscription"

const MarketSubscription = ({
  variables,
}: {
  variables: onMarketSubscriptionVariables
}) => {
  const { loading, data } = useSubscription<
    onMarketSubscription,
    onMarketSubscriptionVariables
  >(MarketQuery, {
    shouldResubscribe: false,
    variables,
  })
  if (loading) {
    return <AdaptiveLoader size={35} speed={1.4} />
  }
  if (data) {
    const stockPrice = data.getQuotes
    return <StockPrice stockPrice={stockPrice} symbol={stockPrice.id} />
  }
  return <></>
}

export default MarketSubscription
