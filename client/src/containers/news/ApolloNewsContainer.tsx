import React from "react"

import { AppQuery } from "../../common/AppQuery"
import { IApolloContainerProps } from "../../common/IApolloContainerProps"
import { News } from "./components"
import NewsConnection from "./graphql/NewsConnection.graphql"
import { NewsQuery, NewsQueryVariables } from "./graphql/types/NewsQuery"

const ApolloNewsContainer: React.FunctionComponent<IApolloContainerProps> = ({
  id,
}) => {
  const onNewsQueryResults = ({ news }: NewsQuery): JSX.Element => {
    return <News news={news} id={id} />
  }

  return (
    <AppQuery<NewsQuery, NewsQueryVariables>
      query={NewsConnection}
      variables={{ id }}
      renderLoadingHeight="225px"
    >
      {onNewsQueryResults}
    </AppQuery>
  )
}

export default ApolloNewsContainer
