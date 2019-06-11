import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query ArticlesQuery {
      allNodeArticle {
        nodes {
          id
          title
          path {
            alias
          }
        }
      }
    }
  `)

  return (
    <ul>
      {data.allNodeArticle.nodes.map(article => (
        <li>
          <Link to={article.path.alias}>{article.title}</Link>
        </li>
      ))}
    </ul>
  )
}
