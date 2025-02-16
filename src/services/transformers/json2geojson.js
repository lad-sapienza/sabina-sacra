const json2geoJson = (json, geoDataField) => {
  console.log("[json2geoJson] Input array length:", json?.length);
  console.log("[json2geoJson] geoDataField:", geoDataField);

  const features = json.map((item, idx) => {
    console.log(`[json2geoJson] item[${idx}]`, item);

    // Se manca item[geoDataField], scartiamo il record
    if (!item[geoDataField]) {
      console.warn(`[json2geoJson] item[${idx}] NON ha il campo ${geoDataField}`);
      return null;
    }

    // Se manca item[geoDataField].coordinates
    if (
      !item[geoDataField].coordinates ||
      !Array.isArray(item[geoDataField].coordinates) ||
      item[geoDataField].coordinates.length < 2
    ) {
      console.warn(`[json2geoJson] item[${idx}] coordinate non valide:`, item[geoDataField]);
      return null;
    }

    const [lon, lat] = item[geoDataField].coordinates;

    return {
      type: "Feature",
      properties: item,
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
    };
  });

  const validFeatures = features.filter(Boolean);

  console.log("[json2geoJson] validFeatures length:", validFeatures.length);

  return {
    type: "FeatureCollection",
    features: validFeatures,
  };
};

export default json2geoJson;
