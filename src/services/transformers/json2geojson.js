const json2geoJson = (json, geoDataField) => {

  const filt_json = json.filter( i => i[geoDataField] !== null )

  return {
    type: "FeatureCollection",
    features: filt_json.map(item => ({
      type: "Feature",
      properties: item,
      geometry: {
        type: "Point",
        coordinates: [
          item[geoDataField].coordinates[0], // longitude
          item[geoDataField].coordinates[1], // latitude
        ],
      },
    })),
  }
}

export default json2geoJson;