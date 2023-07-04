import React, { useMemo } from "react"

import {
  DataCard,
  DataContents,
  Link,
  Text,
} from "../../common/StyledComponents"
import { search_symbols } from "./graphql/types/search"

interface IProps {
  foundSymbol?: search_symbols
  id: string
  market: string
  onClick?: (symbol: search_symbols | null) => void
}

export const SearchErrorCard: React.FunctionComponent<IProps> = ({
  foundSymbol,
  id,
  market,
  onClick,
}) => {
  const message = useMemo(() => {
    if (foundSymbol && onClick) {
      return (
        <>
          <Text>Perhaps you were looking for this?</Text>
          <Link onClick={() => onClick(foundSymbol)}>{foundSymbol.name}</Link>
        </>
      )
    }
    return null
  }, [foundSymbol, onClick])
  return (
    <DataCard title={id} instrument={id}>
      <DataContents>
        <Text>This {market.toLowerCase()} is not recognized.</Text>
        {message}
      </DataContents>
    </DataCard>
  )
}
