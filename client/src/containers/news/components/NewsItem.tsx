import moment from "moment/moment"
import React, { MouseEvent } from "react"

import { usePlatform } from "@/ra-platforms"

import { Link } from "../../../common/StyledComponents"
import { NewsCaption, NewsHeadline, NewsItemContents } from "./NewsItem.styles"

export interface INewsArticle {
  id: string
  datetime: string
  headline: string
  source: string
  url: string
}

const NewsItem: React.FunctionComponent<INewsArticle> = ({
  id,
  url,
  headline,
  datetime,
  source,
}) => {
  const platform = usePlatform()

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    platform.openUrl(e.currentTarget.href)
  }

  return (
    <NewsItemContents>
      <Link style={{ cursor: "pointer" }} href={url} onClick={clickHandler}>
        <NewsHeadline>{headline}</NewsHeadline>
      </Link>
      <NewsCaption>
        {moment(datetime).fromNow()} - {source}
      </NewsCaption>
    </NewsItemContents>
  )
}

export default NewsItem
