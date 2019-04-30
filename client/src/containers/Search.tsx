import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { search, search_search, searchQuery, searchQueryVariables, searchVariables } from '../__generated__/types'
import { AppQuery } from '../common/AppQuery'
import SearchConnection from '../graphql/SearchConnection.graphql'
import SimpleSearchConnection from '../graphql/SimpleSearchConnection.graphql'

import { SearchBar } from './Search/components'

import apolloClient from '../apollo/client'

export interface IProps {
  id: string
  url: RegExp
}

type Props = RouteComponentProps & IProps

export const Search: React.FunctionComponent<Props> = (props: Props) => {
  const [initialized, setInitialized] = useState(false)
  const [currentSymbol, setCurrentSymbol] = useState<search_search | null>(null)
  const [currentText, setCurrentText] = useState<string>('')

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      if (props.id) {
        apolloClient
          .query<searchQuery, searchQueryVariables>({
            query: SearchConnection,
            variables: { id: props.id },
          })
          .then(result => {
            if (result.data && result.data.stock && result.data.stock.company) {
              setCurrentSymbol({
                __typename: 'SearchResult',
                id: result.data.stock.company.id,
                name: result.data.stock.company.name,
              } as search_search)
            }
            if (currentSymbol) {
              console.log('something')
            }
          })
      }
    }
  }, [props.id])

  const onSymbolChanged = (id: string) => {
    props.history.push(`${props.url}${id}`)
    if ((window as any).fin) {
      ;(window as any).fin.desktop.InterApplicationBus.publish('SYMBOL.CHANGE', {
        data: {
          selection: {
            __typename: 'Selection',
            id,
            symbol: id,
          },
        },
      })
    }
  }

  const onTextChange = (text: string) => {
    setCurrentText(text)
  }

  const handleChange = (symbol: search_search | null) => {
    setCurrentSymbol(symbol)
    if (symbol) {
      onSymbolChanged(symbol.id)
    }
  }

  return (
    <AppQuery<search, searchVariables> query={SimpleSearchConnection} variables={{ text: currentText }}>
      {(data, __) => {
        return <SearchBar items={data.search} onChange={handleChange} onTextChange={onTextChange} />
      }}
    </AppQuery>
  )
}

export default withRouter(Search)
