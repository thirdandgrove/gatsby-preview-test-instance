import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query ArticleQuery {
      nodeArticle {
        id
        title
        body {
          processed
        }
      }
    }
  `)

  return (
    <header>
      <h1>{data.nodeArticle.title}</h1>
      <br />
      <hr />
      <span
        dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.processed }}
      />
    </header>
  )
}
