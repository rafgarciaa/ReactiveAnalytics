import React from "react"

import { MainGridArea, NewsGridArea } from "../../../common/StyledComponents"
import { Company, History, News, Peers, Stats } from "../../index"
import { useParams } from "react-router-dom"

const Stocks= () =>{
  const id = useParams()['id'] || "";
  return (
    <>
      <MainGridArea>
        <History id={id} />
        <Stats id={id} />
      </MainGridArea>
      <NewsGridArea>
        <Company id={id} />
        <Peers id={id} />
        <News id={id} />
      </NewsGridArea>
    </>
  )
}

export default Stocks
