import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { Container } from "react-bootstrap";

const HeaderSection = () => (
  <Header>
    <Container>
      <div className="d-sm-flex align-items-center text-center">
        <Link to={"/"}>
          {/* Usa StaticImage per immagini ottimizzate */}
          <StaticImage
            src="../images/logo_sabina.jpeg"
            alt="Sabina Sacra"
            width={150}
            quality={80}
            formats={["AUTO", "WEBP", "PNG"]}
            className="img-fluid"
          />
        </Link>
        <div className="text-start ms-3">
          <h1>Sabina Sacra</h1>
          <p className="lead">Panorami di diversità: ebrei, cristiani e spazio sacro in Sabina e nella Valle dell’Aniene, tra Tarda Antichità, Età Moderna ed Età Contemporanea </p>
        </div>
      </div>
    </Container>
  </Header>
);

const Header = styled.header`
  background-color: #4682b4; /* Blu acciaio */
  color: #ffffff; /* Testo bianco per contrasto */
  margin-bottom: 5rem;
  padding: 20px 0;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 300;
  }

  .gatsby-image-wrapper,
  img {
    background-color: #ffffff;
    border-radius: 50%; /* Logo arrotondato */
    padding: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export default HeaderSection;
