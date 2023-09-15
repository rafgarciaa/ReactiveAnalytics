import React, { MouseEventHandler } from "react"

import { PeersLink } from "./Peers.styles"

type PeerItemProps = {
  symbol: string
}

const PeerItem: React.FunctionComponent<PeerItemProps> = ({
  symbol,
}) => {
  const navClickHandler: MouseEventHandler<HTMLAnchorElement> = async (
    event,
  ) => {
    const newSymbol = event.currentTarget.dataset.symbol

    //history.push(`/stock/${newSymbol}`)
  }

  return (
    <PeersLink onClick={navClickHandler} data-symbol={symbol} key={symbol}>
      {symbol}
    </PeersLink>
  )
}

//export default withRouter(PeerItem)
