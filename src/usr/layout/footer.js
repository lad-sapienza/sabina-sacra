import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Github, Bug } from "react-bootstrap-icons";

const FooterSection = () => {
  return (
    <Footer>
      <Container>
        <Row className="py-3">
          {/* Left Column - Sapienza Logo */}
          <Col md={2} className="text-center">
            <a href="https://www.uniroma1.it" target="_blank" rel="noreferrer">
              <StaticImage
                src="../images/logo_sapienza_footer.png"
                width={200}
                quality={90}
                formats={["AUTO", "WEBP", "PNG"]}
                alt="Sapienza Università di Roma"
                className="img-fluid"
                style={{ filter: "brightness(0) contrast(100%)" }}
              />
            </a>
          </Col>

          {/* Center Column - Credits */}
          <Col md={7} className="text-center">
            <p>
              <strong>Partenariato Esteso 5 (“CHANGES”)</strong>
              <br />
              <strong>Spoke 1:</strong> Historical landscapes, traditions and
              cultural identities.
              <br />
              <strong>WP 5:</strong> Archeologia del sacro.
              <br />
              <strong>Linea tematica 3:</strong> Panorami di diversità. Ebrei,
              Cristiani e spazio sacro tra Sabina e Valle dell'Aniene, dall'età
              tardoantica a quella contemporanea.
              <br />
              <strong>Co-PI per il Dip. SARAS:</strong> Paola Buzi.
              <br />
              <strong>PI per Sapienza:</strong> Orazio Carpenzano.
            </p>
          </Col>

          {/* Right Column - Developers */}
          <Col md={3} className="text-center fs-6">
            <p>
              Il portale Sabina Sacra è stato costruito con <strong>s:CMS</strong>, un framework sviluppato dal{" "}
              <a
                href="https://lad.saras.uniroma1.it"
                target="_blank"
                rel="noreferrer"
              >
                LAD: Laboratorio di Archeologia Digitale alla Sapienza
              </a>
            </p>
            <hr />
            <div>
              <a
                href="mailto:julian.bogdani@uniroma1.it"
                title="Invia una mail a Julian Bogdani"
              >
                <StaticImage
                  src="../images/lad-rect.png"
                  width={30}
                  quality={90}
                  formats={["AUTO", "WEBP"]}
                  alt="LAD: Laboratorio di Archeologia Digitale alla Sapienza"
                  className="me-2"
                  style={{ filter: "grayscale(100%) brightness(0.5)" }}
                />
                Julian Bogdani
              </a>
            </div>
            <div>
              <a
                href="mailto:erasmo.difonso@libero.it"
                title="Invia una mail a Erasmo di Fonso"
              >
                <StaticImage
                  src="../images/logo_erasmo.svg"
                  width={30}
                  quality={90}
                  formats={["AUTO", "WEBP", "PNG"]}
                  alt="Erasmo di Fonso"
                  className="me-2"
                  style={{ mixBlendMode: "multiply" }}
                />
                Erasmo di Fonso
              </a>
            </div>
            <div className="mt-2">
              <a
                href="https://github.com/lab-archeologia-digitale/sCMS"
                target="_blank"
                rel="noreferrer"
                title="Codice sorgente"
              >
                <Github className="me-2" />
              </a>
              —
              <a
                href="https://github.com/lab-archeologia-digitale/sCMS/issues"
                target="_blank"
                rel="noreferrer"
                title="Segnala un problema"
              >
                <Bug className="ms-2" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};

// Styled Footer Component
const Footer = styled.footer`
  background-color: #f8f4e9;
  border-top: 4px solid #5a3921;
  padding: 1.5rem 0;
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
`;

export default FooterSection;
