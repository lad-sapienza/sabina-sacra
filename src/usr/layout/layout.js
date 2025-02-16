import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Container } from "react-bootstrap"

import Navbar from "../../modules/autoNavbar"
import Footer from "./footer"
import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="container-fluid p-0">
        <Navbar siteTitle={data.site.siteMetadata?.title || `Title`} />
        
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main style={{ backgroundColor: '#f5e6d3', margin: 0, padding: 0 }}>
  <Container style={{ padding: 0 }}>{children}</Container>
</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
