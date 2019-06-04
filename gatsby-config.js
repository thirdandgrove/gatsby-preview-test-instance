const proxy = require("http-proxy-middleware")

module.exports = {
  siteMetadata: {
    title: `Gatsby Preview Test`,
    description: `Testing preview with drupal.`,
    author: `Third and Grove`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal-preview`,
      options: {
        baseUrl: "http://dev-gatsby-preview-test.pantheonsite.io",
        preview: true,
      },
    },
  ],
}
