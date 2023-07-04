import React from "react"

import { IApolloContainerProps } from "@/common/IApolloContainerProps"
import { MainGridArea } from "@/common/StyledComponents"
import { FXHistory } from "@/containers/history"

const Currencies: React.FunctionComponent<IApolloContainerProps> = ({ id }) => {
  return (
    <>
      <MainGridArea>
        <FXHistory id={id} />
      </MainGridArea>
    </>
  )
}

export default Currencies
