import React from "react"

import { AppQuery } from "@/common/AppQuery"
import { IApolloContainerProps } from "@/common/IApolloContainerProps"
import { HistoryWrapper } from "@/common/StyledComponents"

import { StockHistoryChart } from "./components/StockHistoryChart"
import StockHistoryConnection from "./graphql/StockHistoryConnection.graphql"
import {
  StockHistoryQuery,
  StockHistoryQueryVariables,
} from "./graphql/types/StockHistoryQuery"

const History: React.FC<IApolloContainerProps> = ({ id }) => {
  return (
    <>
      <AppQuery<StockHistoryQuery, StockHistoryQueryVariables>
        query={StockHistoryConnection}
        variables={{ id }}
      >
        {StockHistoryChart}
      </AppQuery>
    </>
  )
}

export const StockHistoryContainer: React.FC<IApolloContainerProps> = ({
  id,
}) => (
  <HistoryWrapper>
    <History id={id} />
  </HistoryWrapper>
)

export default StockHistoryContainer
