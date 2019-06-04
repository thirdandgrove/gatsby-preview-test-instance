import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query ArticleQuery {
      nodeArticle(drupal_id: { eq: "7ff16353-c43f-4c84-b631-324d70470fa7" }) {
        id
        title
        relationships {
          field_paragraph_content {
            ... on paragraph__text {
              field_text {
                processed
              }
            }
          }
          field_image {
            localFile {
              publicURL
            }
          }
        }
        body {
          processed
        }
      }
    }
  `)

  return (
    <header>
      <h1>{data.nodeArticle.title}</h1>
      <img
        src={data.nodeArticle.relationships.field_image.localFile.publicURL}
        alt="things here"
      />
      <br />
      <hr />
      <span
        dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.processed }}
      />
    </header>
  )
}
