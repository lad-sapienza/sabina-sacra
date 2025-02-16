const getDataFromObj = (obj, search) => {
  let output = null; // Inizializza output a null

  // Controlla se obj è definito e un oggetto
  if (!obj || typeof obj !== 'object') {
    console.warn("getDataFromObj: obj is undefined or not an object");
    return output; // Esci anticipatamente se obj non è valido
  }

  search.forEach((searchEl) => {
    // Controlla se obj ha la proprietà searchEl e se non è "undefined"
    if (obj.hasOwnProperty(searchEl) && obj[searchEl] !== undefined) { // Cambiato "undefined" per gestire correttamente i valori
      if (typeof obj[searchEl] === "string") {
        output = obj[searchEl];
        return; // Esci da forEach una volta trovato il valore
      } else {
        search.shift(); // Rimuovi il primo elemento dall'array di ricerca
        if (search.length === 0) {
          output = obj[searchEl]; // Se non ci sono più elementi da cercare, restituisci l'elemento attuale
          return; 
        }
        output = getDataFromObj(obj[searchEl], search); // Chiamata ricorsiva
      }
    }
  });

  return output; // Restituisci l'output trovato o null
}

export default getDataFromObj;
