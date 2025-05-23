import * as React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import styled from "styled-components"
import { useStaticQuery, graphql, withPrefix } from "gatsby"

function AutoNavbar({ currentLang, siteTitle }) {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { menu_position: { gt: 0 } } }
        sort: { frontmatter: { menu_position: ASC } }
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
            menu_position
          }
        }
      }
    }
  `)
  return (
    <Menu>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href={withPrefix(`/`)}>{siteTitle}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {data.allMdx.nodes.map(
                (menuItem, index) =>
                  ((currentLang &&
                    menuItem.frontmatter.slug.includes(`${currentLang}/`)) ||
                    !currentLang) && (
                    <div className="containerLink" key={index}>
                      <Nav.Link
                        href={withPrefix(`/${menuItem.frontmatter.slug}`)}
                        className="nav-item my-2"
                      >
                        {menuItem.frontmatter.title}
                      </Nav.Link>
                    </div>
                  ),
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Menu>
  )
}

//style
const Menu = styled.div`
  .bg-body-tertiary {
    background-color: #ececec !important;
  }
`
export default AutoNavbar
