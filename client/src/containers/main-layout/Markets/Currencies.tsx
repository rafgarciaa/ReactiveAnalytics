import React from "react"

import { MainGridArea } from "@/common/StyledComponents"
import { FXHistory } from "@/containers/history"
import { useParams } from "react-router-dom"

const Currencies= () =>{
  const id = useParams()['id'] || "";
  return (
    <>
      <MainGridArea>
        <FXHistory id={id} />
      </MainGridArea>
    </>
  )
}

export default Currencies
