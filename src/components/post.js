import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <header>
      <h1>{data.nodeArticle.title}</h1>
      <img
        src={data.nodeArticle.relationships.field_image.localFile.publicURL}
        alt="things here"
      />
      <br />
      <hr />
      <span>
        {data.nodeArticle.relationships.field_paragraph_content &&
          data.nodeArticle.relationships.field_paragraph_content.map(field => {
            if (field.internal.type === "paragraph__text") {
              return (
                <article
                  dangerouslySetInnerHTML={{
                    __html: field.field_text.processed,
                  }}
                />
              )
            }
            if (field.internal.type === "paragraph__image") {
              return (
                <img
                  src={
                    field.relationships.field_image.relationships
                      .field_media_image.localFile.publicURL
                  }
                  alt="paragraph"
                />
              )
            }
          })}
      </span>
      <br />
      <hr />
      <span
        dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.processed }}
      />
    </header>
  )
}

export const query = graphql`
  query($DrupalId: String!) {
    nodeArticle(drupal_id: { eq: $DrupalId }) {
      id
      title
      relationships {
        field_paragraph_content {
          ... on paragraph__text {
            internal {
              type
            }
            field_text {
              processed
            }
          }
          ... on paragraph__image {
            internal {
              type
            }
            relationships {
              field_image {
                relationships {
                  field_media_image {
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }
          }
        }
        field_image {
          filename
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
`
