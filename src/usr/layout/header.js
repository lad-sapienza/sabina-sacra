import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Container } from "react-bootstrap";

const HeaderSection = () => (
  <header className="bg-primary text-white mb-5 p-3">
    <Container>
      <div className="d-sm-flex align-items-center text-center">
        <Link to={"/"}>
        <StaticImage
          src="../images/logo-sabina-sacra.png"
          alt="Sabina Sacra"
          width={150}
          quality={80}
          formats={["AUTO", "WEBP", "PNG"]}
          className="img-fluid"
        />
        </Link>
        <div className="text-start ms-3">
          <h1>Sabina Sacra</h1>
          <p className="lead">Panorami di diversità: ebrei, cristiani e spazio sacro in Sabina e nella Valle dell’Aniene, tra Tarda Antichità ed Età Contemporanea </p>
        </div>
      </div>
    </Container>
  </header>
);

export default HeaderSection;
