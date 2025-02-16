const parseStringTemplate = (template, properties) => {
  return template.replace(/\$\{([\w\-]+)\}/g, (_, key) => {
    const value = properties[key];
    return value !== null && value !== undefined && value !== ""
      ? value
      : "Non specificato"; // Fallback
  });
};


export default parseStringTemplate;