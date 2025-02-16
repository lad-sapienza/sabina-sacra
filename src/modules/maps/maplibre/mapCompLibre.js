import * as React from "react"
import { useState, useCallback, useRef } from "react"
import "maplibre-gl/dist/maplibre-gl.css"
import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Popup,
} from "react-map-gl/maplibre"
import PropTypes from "prop-types"
import SimpleControl from "./simpleControl"
import { RasterLayerLibre } from "./rasterLayerLibre"
import { defaultBaseLayers } from "../../maps/defaultBaseLayers"
import parseStringTemplate from "../../../services/parseStringTemplate"
import { withPrefix } from "gatsby"

const MapCompLibre = ({
  children,
  height,
  center,
  mapStyle,
  geolocateControl,
  fullscreenControl,
  navigationControl,
  scaleControl,
  baseLayers,
}) => {
  const [lng, lat, zoom] = center
    ? center.split(",").map(e => parseFloat(e.trim()))
    : [0, 0, 2]

  const [clickInfo, setClickInfo] = useState(null)
  const interactiveLayersRef = useRef([])

  const onMapLoad = useCallback(event => {
    const mapInstance = event.target

    // test custom control
    const customControl = new SimpleControl()
    mapInstance.addControl(customControl, "top-right")

    // Usa map per scorrere i layer e filtrare quelli con metadata.popupTemplate
    const dynamicInteractiveLayers = mapInstance
      .getStyle()
      .layers.map(layer =>
        layer.metadata && layer.metadata.popupTemplate ? layer.id : null,
      )
      .filter(Boolean) // Rimuove i valori null

    // Salva i layer interattivi nella variabile di riferimento
    interactiveLayersRef.current = dynamicInteractiveLayers
  }, [])

  const onClick = useCallback(event => {
    const { lngLat, point } = event
    const mapInstance = event.target

    // Usa queryRenderedFeatures per ottenere le feature dal punto cliccato
    const clickedFeatures = mapInstance.queryRenderedFeatures(point, {
      layers: interactiveLayersRef.current,
    })

    const clickedFeature = clickedFeatures.find(feature =>
      interactiveLayersRef.current.includes(feature.layer.id),
    )

    setClickInfo(
      clickedFeature ? { feature: clickedFeature, lngLat: lngLat } : null,
    )
  }, [])

  // Filtra i base layers in base alla proprietà `baseLayers`
  const filteredBaseLayers = baseLayers
    ? baseLayers
        .map(lyr => (defaultBaseLayers[lyr] ? defaultBaseLayers[lyr] : null))
        .filter(x => x)
    : []

  return (
    <React.Fragment>
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: zoom,
        }}
        style={{ height: height ? height : `800px` }}
        mapStyle={mapStyle && mapStyle.startsWith('http') ? mapStyle : withPrefix(mapStyle)}
        onLoad={onMapLoad}
        onClick={onClick}
      >
        {filteredBaseLayers &&
          filteredBaseLayers.map((obj, i) => (
            <RasterLayerLibre
              key={i}
              name={obj.name}
              url={[obj.url]}
              checked={i === 0}
              attribution={obj.attribution}
            />
          ))}

        {children}
        {clickInfo && clickInfo.feature.layer.metadata.popupTemplate && (
          <Popup
            anchor="top"
            longitude={clickInfo.lngLat.lng}
            latitude={clickInfo.lngLat.lat}
            onClose={() => setClickInfo(null)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: parseStringTemplate(
                  clickInfo.feature.layer.metadata.popupTemplate,
                  clickInfo.feature.properties,
                ),
              }}
            />
          </Popup>
        )}

        {geolocateControl && <GeolocateControl position={geolocateControl} />}
        {fullscreenControl && (
          <FullscreenControl position={fullscreenControl} />
        )}
        {navigationControl && (
          <NavigationControl position={navigationControl} />
        )}
        {scaleControl && <ScaleControl position={scaleControl} />}
      </Map>
    </React.Fragment>
  )
}
MapCompLibre.propTypes = {
  /**
   * Height (with units) of the map to render
   * Optional. Default: "800px"
   */
  height: PropTypes.string,
  /**
   * Center of the initial map, in the shape of long,lat,zoom (string, comma-separated)
   * Optional. Default: "0,0,2"
   */
  center: PropTypes.string,
  /**
   * URL of the JSON mapstyle file
   * Optional. Default: null
   */
  mapStyle: PropTypes.string,
  /**
   * Position in the map frame of the Geolocate Control. If not provided, the Geolocate Controle will not be shown
   * Can be one of the following: "top-right", "top-left", "bottom-right", "bottom-left"
   * Default: false
   */
  geolocateControl: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  /**
   * Position in the map frame of the Fullscreen Control. If not provided, the Fullscreen Controle will not be shown
   * Can be one of the following: "top-right", "top-left", "bottom-right", "bottom-left"
   * Default: false
   */
  fullscreenControl: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  /**
   * Position in the map frame of the Navigation Control. If not provided, the Navigation Controle will not be shown
   * Can be one of the following: "top-right", "top-left", "bottom-right", "bottom-left"
   * Default: false
   */
  navigationControl: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  /**
   * Position in the map frame of the Scale Control. If not provided, the Scale Controle will not be shown
   * Can be one of the following: "top-right", "top-left", "bottom-right", "bottom-left"
   * Default: false
   */
  scaleControl: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  /**
   * An adday with the identifiers of the default raster base layers to show in the map.
   * Can be one or more of the following: "CAWM", "OSM", "EsriSatellite","EsriStreets", "EsriTopo", "GoogleSatellite", "GoogleRoadmap", "GoogleTerrain", "GoogleAlteredRoadmap", "GoogleTerrainOnly", "GoogleHybrid", "CartoDb", "StamenTerrain", "OSMMapnick", "OSMCycle",
   * Default: null
   */
  baseLayers: PropTypes.arrayOf(
    PropTypes.oneOf([
      "CAWM",
      "OSM",
      "EsriSatellite",
      "EsriStreets",
      "EsriTopo",
      "GoogleSatellite",
      "GoogleRoadmap",
      "GoogleTerrain",
      "GoogleAlteredRoadmap",
      "GoogleTerrainOnly",
      "GoogleHybrid",
      "CartoDb",
      "StamenTerrain",
      "OSMMapnick",
      "OSMCycle",
    ]),
  ),
}

export { MapCompLibre }
