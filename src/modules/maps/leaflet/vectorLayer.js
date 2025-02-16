import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GeoJSON, LayersControl, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import * as bbox from "geojson-bbox";

import getDataFromSource from "../../../services/getDataFromSource";
import sourcePropTypes from "../../../services/sourcePropTypes";

const parseStringTemplate = (template, properties) => {
  return template.replace(/\$\{([\w\-]+)\}/g, (_, key) => {
    const value = properties[key];
    return value !== null && value !== undefined && value !== "" ? value : "Non specificato";
  });
};

function VectorLayer({
  source,
  name,
  popupTemplate,
  pointToLayer,
  checked,
  fitToContent,
  searchTerm,
  detailCharacteristic = "",
}) {
  const [geojsonData, setGeojson] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(false);
  const map = useMap();

  source.transType = source.transType || "geojson";

  useEffect(() => {
    getDataFromSource(source)
      .then((geoJSON) => {
        if (!geoJSON || !geoJSON.features) {
          setGeojson(null);
          return;
        }
        setGeojson(geoJSON);
        setFilteredData(geoJSON.features);
      })
      .catch(() => setError("Errore nel recupero dei dati"));
  }, [source, name]);

  useEffect(() => {
    if (geojsonData) {
      const newFilteredData = geojsonData.features.filter((feature) => {
        const fProps = feature.properties || {};
        const matchesName =
          searchTerm === "" ||
          (fProps.name && fProps.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesTipoSearch =
          detailCharacteristic === "" ||
          (fProps.caratteristica_di_dettaglio &&
            fProps.caratteristica_di_dettaglio.toLowerCase() === detailCharacteristic.toLowerCase());
        return matchesName && matchesTipoSearch;
      });
      setFilteredData(newFilteredData);
    }
  }, [searchTerm, detailCharacteristic, geojsonData, name]);

  useEffect(() => {
    if (fitToContent && geojsonData && geojsonData.features.length > 0) {
      const lBb = bbox(geojsonData);
      if (lBb.length === 4) {
        map.fitBounds([
          [lBb[1], lBb[0]],
          [lBb[3], lBb[2]],
        ]);
      }
    }
  }, [fitToContent, geojsonData, map, name]);

  if (error) return <div className="text-danger">Errore nel rendering della mappa</div>;
  if (!geojsonData) return <div>[VectorLayer: {name}] Caricamento in corso o dati mancanti...</div>;
  if (!filteredData.length) return <div>[VectorLayer: {name}] Nessun dato da mostrare</div>;

  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    return L.divIcon({
      html: `<div style="background-color: #3186cc; color: white; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 14px;">${count}</div>`,
      className: "custom-cluster-icon",
      iconSize: L.point(30, 30),
    });
  };

  return (
    <LayersControl.Overlay name={name} checked={checked}>
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        <GeoJSON
          key={filteredData.length}
          data={{ ...geojsonData, features: filteredData }}
          pointToLayer={pointToLayer || null}
          onEachFeature={popupTemplate ? async (feature, layer) => {
            const content = parseStringTemplate(popupTemplate, feature.properties);
            const id = feature.properties?.id || "undefined";
            const resource = source.dtable || source.resource || "luogo_di_interesse"; 
            const fontiIDs = feature.properties?.fonti || []; // Prende gli ID delle fonti
        
            // Link corretto per la pagina Gatsby
            const link = `../record/?tb=${resource}&id=${id}`;
        
            // Funzione per ottenere i nomi delle fonti da Directus
            async function fetchFontiDetails(fontiIDs) {
                if (!fontiIDs.length) return "Nessuna fonte disponibile";
                
                try {
                    const token = process.env.GATSBY_DIRECTUS_TOKEN || "<TUO_TOKEN_HARD_CODED>"; // Usa il token dall'env
                    const response = await fetch(
                      `https://db.lad-sapienza.it/sabina/items/fonte?fields=id,nome&filter={"id":{"_in":[${fontiIDs.join(",")}]}}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const data = await response.json();
                    
                    if (data.data && data.data.length > 0) {
                        return data.data.map(fonte => fonte.nome).join("<br/>");
                    } else {
                        return "Nessuna fonte trovata";
                    }
                } catch (error) {
                    console.error("Errore nel recupero delle fonti:", error);
                    return "Errore nel recupero delle fonti";
                }
            }
        
            // Recupera le fonti e aggiorna il popup
            const fontiDetails = await fetchFontiDetails(fontiIDs);
        
            // Creiamo il contenuto del popup con il link formattato e le fonti
            const popupContent = `
                ${content} 
                <br/> 
                <strong>Fonti:</strong> <br/> ${fontiDetails} 
                <br/>
                <a href="${link}" style="color: blue; text-decoration: underline;">Dettagli</a>
            `;
        
            layer.bindPopup(popupContent);
        } : null}        
        
        />
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
}

VectorLayer.propTypes = {
  source: sourcePropTypes.isRequired,
  name: PropTypes.string.isRequired,
  popupTemplate: PropTypes.string,
  pointToLayer: PropTypes.func,
  checked: PropTypes.bool,
  fitToContent: PropTypes.bool,
  searchTerm: PropTypes.string,
  detailCharacteristic: PropTypes.string,
};

export { VectorLayer };
