import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const logos = [
  { src: "/images/logo_nextgenerationEU.png", alt: "NextGenerationEU" },
  { src: "/images/logo_Ministero.png", alt: "Ministero dell’Università e della Ricerca" },
  { src: "/images/logo_italiadomani.png", alt: "Italia Domani - PNRR" },
  { src: "/images/logo_changes.png", alt: "CHANGES" },
  { src: "/images/logo_sapienza.png", alt: "Sapienza Università di Roma" },
];

// Ridotto padding verticale (0.25rem)
const logoWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 1rem", // ⬅️ solo 4px sopra e sotto
  height: "100%",
};

const separatorStyle = {
  width: "2px",
  backgroundColor: "white",
  height: "60px",
  margin: "0 1rem",
  alignSelf: "center",
};

const LogoBar = () => {
  return (
    <Container fluid style={{ backgroundColor: "#2b65af" }} className="py-1 px-0">
      <Row className="align-items-center justify-content-center text-center g-0 flex-wrap">
        {logos.map((logo, idx) => (
          <React.Fragment key={logo.alt}>
            <Col xs={12} sm className={idx !==0 && 'border-start'}>
              <div style={logoWrapperStyle}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="img-fluid d-block"
                  style={{ maxHeight: "100px" }}
                />
              </div>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default LogoBar;
