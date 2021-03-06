import React from "react"
// import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

import { kebabCase } from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Authors = ({ pageContext, data }) => {
  //   const siteTitle = data.site.siteMetadata.title
  const { author } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const authorHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } authored with "${author}"`

  return (
    <Layout>
      <SEO title={author} />
      <h1 className="mb-5">{authorHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          //   const { slug } = node.fields
          //   const { title } = node.frontmatter
          //   return (
          //     <li key={slug}>
          //       <Link to={slug}>{title}</Link>
          //     </li>
          //   )
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt || "",
                  }}
                />
              </section>
              <div className="category"></div>
              <div className="author">
                authors: &nbsp;
                {node.frontmatter.author ? (
                  <ul className="authorlist">
                    {/* {node.frontmatter.author.map(authorItem => ( */}
                    <li key={node.frontmatter.author + `author`}>
                      <Link
                        to={`/authors/${kebabCase(node.frontmatter.author)}/`}
                      >
                        {node.frontmatter.author}
                      </Link>
                    </li>
                    {/* ))} */}
                  </ul>
                ) : (
                  <div className="author__default">dentalimplants</div>
                )}
              </div>
              <div className="mb-3"></div>
            </article>
          )
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      {/* <Link to="/authors">All authors</Link> */}
    </Layout>
  )
}

// Authors.propTypes = {
//   pageContext: PropTypes.shape({
//     author: PropTypes.string.isRequired,
//   }),
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       totalCount: PropTypes.number.isRequired,
//       edges: PropTypes.arrayOf(
//         PropTypes.shape({
//           node: PropTypes.shape({
//             frontmatter: PropTypes.shape({
//               title: PropTypes.string.isRequired,
//             }),
//             fields: PropTypes.shape({
//               slug: PropTypes.string.isRequired,
//             }),
//           }),
//         }).isRequired
//       ),
//     }),
//   }),
// }

export default Authors

export const pageQuery = graphql`
  query($author: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { in: [$author] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
          }
        }
      }
    }
  }
`
