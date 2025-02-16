import React, { useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, LayersControl } from "react-leaflet";
import { RasterLayer } from "./rasterLayer";
import { defaultBaseLayers } from "../defaultBaseLayers";

/**
 * Mappa Leaflet che include i filtri (nome e tipologia)
 * e passa "searchTerm" e "detailCharacteristic" ai figli (VectorLayer).
 */
function MapLeaflet({
  // Parametri di default, per evitare React warning su defaultProps
  height = "800px",
  center = "0,0,2",
  baseLayers = [],
  children,
  scrollWheelZoom = true,
  layersControlPosition = "topright",
  searchable = false,
  onLoad = () => {},
}) {
  const [lng, lat, zoom] = center.split(",").map((e) => parseFloat(e.trim()));

  // Stati per i filtri
  const [searchTerm, setSearchTerm] = useState("");
  const [detailCharacteristic, setDetailCharacteristic] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDetailCharacteristicChange = (event) => {
    setDetailCharacteristic(event.target.value);
  };

  return (
    <div>
      {searchable && (
        <div style={{ display: "flex", margin: "10px" }}>
          <input
            type="text"
            placeholder="Cerca per nome..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", padding: "5px", flex: "1" }}
          />
          <select
            value={detailCharacteristic}
            onChange={handleDetailCharacteristicChange}
            style={{ padding: "5px", flex: "1.5" }}
          >
            <option value="">Seleziona tipologia monumento...</option>
            <option value="area a destinazione funeraria (generica)">
              area a destinazione funeraria (generica)
            </option>
            <option value="area di frammenti fittili">area di frammenti fittili</option>
            <option value="basilica cristiana">basilica cristiana</option>
            <option value="cappella">cappella</option>
            <option value="cattedrale">cattedrale</option>
            <option value="castello">castello</option>
            <option value="cimitero">cimitero</option>
            <option value="collegiata">collegiata</option>
            <option value="convento">convento</option>
            <option value="deposito votivo/cultuale">deposito votivo/cultuale</option>
            <option value="episcopio">episcopio</option>
            <option value="eremo">eremo</option>
            <option value="grotta o riparo">grotta o riparo</option>
            <option value="materiale erratico">materiale erratico</option>
            <option value="monastero">monastero</option>
            <option value="monastero con eremo">monastero con eremo</option>
            <option value="monumento commemorativo">monumento commemorativo</option>
            <option value="necropoli">necropoli</option>
            <option value="oratorio">oratorio</option>
            <option value="pieve">pieve</option>
            <option value="santuario (cristiano)">santuario (cristiano)</option>
            <option value="santuario (pagano)">santuario (pagano)</option>
            <option value="seminario">seminario</option>
            <option value="struttura funeraria">struttura funeraria</option>
            <option value="struttura sacra cristiana">struttura sacra cristiana</option>
            <option value="struttura sacra pagana">struttura sacra pagana</option>
            <option value="targa celebrativa">targa celebrativa</option>
          </select>
        </div>
      )}

      <MapContainer
        style={{ height }}
        scrollWheelZoom={scrollWheelZoom}
        center={[lng, lat]}
        zoom={zoom}
        whenCreated={onLoad}
      >
        <LayersControl position={layersControlPosition}>
          {baseLayers.map((layer, index) => {
            const bl = layer.trim();
            if (!defaultBaseLayers[bl]) return null;
            return (
              <RasterLayer
                key={index}
                name={defaultBaseLayers[bl].name}
                url={defaultBaseLayers[bl].url}
                attribution={defaultBaseLayers[bl].attribution || null}
                checked={index === 0}
              />
            );
          })}

          {/* Passiamo i filtri ai figli */}
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { searchTerm, detailCharacteristic })
          )}
        </LayersControl>
      </MapContainer>
    </div>
  );
}

MapLeaflet.propTypes = {
  height: PropTypes.string,
  center: PropTypes.string,
  baseLayers: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  scrollWheelZoom: PropTypes.bool,
  layersControlPosition: PropTypes.string,
  searchable: PropTypes.bool,
  onLoad: PropTypes.func,
};

export { MapLeaflet };
