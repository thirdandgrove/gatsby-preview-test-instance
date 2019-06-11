const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const studies = await graphql(`
    {
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

  studies.data.allNodeArticle.nodes.map(nodeData =>
    createPage({
      path: nodeData.path.alias,
      component: path.resolve(`src/components/post.js`),
      context: {
        ID: nodeData.id,
      },
    })
  )
}
