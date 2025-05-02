import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

const FooterSection = () => {
  return (
    <Footer>
      <Container>
        <Row className="py-3 align-items-center">
          {/* Colonna sinistra - Logo Sapienza ingrandito */}
          <Col md={2} className="text-center">
            <a href="https://www.uniroma1.it" target="_blank" rel="noreferrer">
              <StaticImage
                src="../images/logo_sapienza_footer.png"
                width={200}  // Aumentato al 200%
                quality={90}
                formats={["AUTO", "WEBP"]}
                alt="Sapienza Università di Roma"
                className="img-fluid"
                style={{ 
                  filter: "brightness(0) contrast(100%)",
                  opacity: 0.9
                }}
              />
            </a>
          </Col>

          {/* Colonna centrale - Credits (80% width) */}
          <Col md={8} className="px-md-4">
            <div className="small">
              <p className="mb-1"><strong>Partenariato Esteso 5 ("CHANGES")</strong></p>
              <p className="mb-1"><strong>Spoke 1:</strong> Historical landscapes, traditions and cultural identities • <strong>WP 5:</strong> Archeologia del sacro</p>
              <p className="mb-3"><strong>Linea tematica 3:</strong> Panorami di diversità. Ebrei, Cristiani e spazio sacro tra Sabina e Valle dell'Aniene, dall'età tardoantica a quella contemporanea</p>
              
              <p className="mb-3"><strong>Co-PI per il Dip. SARAS:</strong> Paola Buzi • <strong>PI per Sapienza:</strong> Orazio Carpenzano</p>
              
              {/* Cornicetta separatrice */}
              <div className="border-top border-1 border-secondary opacity-25 my-3"></div>
              
              {/* s:CMS centrato sopra i nomi */}
              <div className="text-center mb-2">
                <p className="mb-0">
                  <strong>s:CMS</strong> framework del{" "}
                  <a href="https://lad.saras.uniroma1.it" target="_blank" rel="noreferrer">
                    LAD
                  </a>
                </p>
              </div>
              
              {/* Nomi affiancati e centrati */}
              <div className="d-flex justify-content-center flex-wrap">
                <div className="d-flex align-items-center mx-3 mb-2">
                  <a href="https://lad.saras.uniroma1.it" target="_blank" rel="noreferrer" className="me-2" style={{ width: '24px' }}>
                    <StaticImage
                      src="../images/lad-rect.png"
                      width={24}
                      quality={90}
                      formats={["AUTO", "WEBP"]}
                      alt="LAD"
                      style={{ 
                        filter: "grayscale(100%) brightness(0.5)"
                      }}
                    />
                  </a>
                  <span>Julian Bogdani <span className="text-muted">julian.bogdani@uniroma1.it</span></span>
                </div>
                
                <div className="d-flex align-items-center mx-3 mb-2">
                  <div className="me-2" style={{ width: '24px' }}>
                    <StaticImage
                      src="../images/logo_erasmo.svg"
                      width={24}
                      quality={90}
                      formats={["AUTO", "WEBP"]}
                      alt=""
                      style={{ 
                        filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))",
                        mixBlendMode: "multiply"
                      }}
                    />
                  </div>
                  <span>Erasmo di Fonso <span className="text-muted">erasmo.difonso@libero.it</span></span>
                </div>
              </div>
            </div>
          </Col>

          {/* Colonna destra - Developers (20% width) */}
          <Col md={2} className="text-center">
            <div className="small">
              <h6 className="text-uppercase mb-3">Developers</h6>
              <div className="d-flex flex-column">
                <a
                  href="https://github.com/lab-archeologia-digitale/sCMS"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-secondary mb-2"
                >
                  <i className="bi bi-github me-1"></i> Code
                </a>
                <a
                  href="https://github.com/lab-archeologia-digitale/sCMS/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-secondary"
                >
                  <i className="bi bi-bug me-1"></i> Issues
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Footer>
  )
}

// Stile ottimizzato
const Footer = styled.footer`
  background-color: #f8f4e9;
  border-top: 4px solid #5a3921;
  padding: 1.5rem 0;
  font-size: 0.85rem;
  color: #5a3921;
  line-height: 1.5;

  a {
    color: #5a3921;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #8c6a56;
      text-decoration: underline;
    }
  }
`

export default FooterSection