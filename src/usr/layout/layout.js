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
      <Navbar siteTitle={data.site.siteMetadata?.title} />
      <Header siteTitle={data.site.siteMetadata?.title} />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}

export default Layout
