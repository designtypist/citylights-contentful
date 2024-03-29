import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Container from '../components/container'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Article from '../components/article'
import Quote from '../components/quote'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [pageHeader] = get(this, 'props.data.allContentfulPageHeader.edges')
    const partners = get(this, 'props.data.allContentfulPartner.edges')
    const citylightsOpportunities = get(this, 'props.data.allContentfulOpportunity.edges')
    const quote = { text: 'Those who serve us are committed to the essential truths of Biblical Christianity.', 
                    button: 'Contact', link: '/#' }

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={pageHeader.node} />
          <Container>
            <main>
              <div class="mission">
                <h2 class="section-headline">Mission: Statement of Faith</h2>
                <Quote quote={quote} />
              </div>
              <div class="partners mb-12">
                <h2>Partners</h2>
                <hr />
                <ul class="flex my-6">
                  {partners.map(({ node }) => {
                    return (
                        <li key={node.id} class="w-1/4" target="_blank">
                          <a href={node.link} >
                            <img src={node.image.file.url} alt={node.name} />
                          </a>
                        </li>
                    )
                  })}
                </ul>
                <hr />
              </div>
              <div class="my-12">
                <h2 class="section-headline lg:text-right sm:text-center">Want to Support Us?</h2>
                <section>
                  {citylightsOpportunities.map(({ node }, index) => {
                    return (
                      <article key={node.id}>
                        {index % 2 === 0 ? 
                          <Article data={node} position='left' />
                          :
                          <Article data={node} position='right' />
                        }
                      </article>
                    )
                  })}
                </section>
              </div>
            </main>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const query = graphql`
{
  allContentfulPageHeader (filter: { name: { regex: "/Support/" } }) {
    edges {
      node {
        name
        heroImage: image {
          fluid(maxWidth: 1180, background: "rgb:000000") {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  allContentfulPartner {
    edges {
      node {
        name
        link
        image {
          file {
            url
          }
        }
      }
    }
  }
  allContentfulOpportunity {
    edges {
      node {
        title
        description {
          description
        }
        image {
          file {
            url
          }
        }
      }
    }
  }
}
`