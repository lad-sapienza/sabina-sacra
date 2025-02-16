import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"

import SearchUI from "./searchUI"

import plain2directus from "../../services/transformers/plain2directus"
import getDataFromSource from "../../services/getDataFromSource"
import sourcePropTypes from "../../services/sourcePropTypes"

const Search = ({
  source,
  resultItemTemplate,
  fieldList,
  operators,
  connector,
}) => {
  const [searchResults, setSearchResults] = useState(null)
  const [previewResults, setPreviewResults] = useState(null) // Nuovo stato per l'anteprima
  const [error, setError] = useState(null)
  
  if (!fieldList) {
    setError("fieldList parameter is missing")
  }
  
  const processData = (conn, inputs) => {
    const filter = JSON.stringify(plain2directus(conn, inputs))

    // Prepara la query per Directus
    source.transType = "json";
    source.dQueryString = `${source.dQueryString ? `${source.dQueryString}&` : ""}filter=${filter}`;
    
    getDataFromSource(source)
      .then(data => {
        if (data.errors) {
          setError("Error in querying getting remote data 1")
        } else {
          setError(null)
          setSearchResults(data) // Imposta i risultati della ricerca
        }
      })
      .catch(err => {
        console.log(err)
        setError("Error in querying getting remote data 2")
      })

    // Logica per ottenere i risultati dell'anteprima
    getDataFromSource({...source, dQueryString: `${filter}`}) // Esegui una query per l'anteprima
      .then(previewData => {
        setPreviewResults(previewData) // Imposta i risultati dell'anteprima
      })
      .catch(err => {
        console.log(err)
        setPreviewResults(null) // Se c'è un errore, resetta l'anteprima
      })
  }

  return (
    <Fragment>
      <SearchUI
        fieldList={fieldList}
        operators={operators}
        connector={connector}
        processData={processData}
      />

      {error && <div className="text-danger">{error}</div>}

      {previewResults?.length > 0 && !error && (
        <Fragment>
          <h2 className="mt-4">Anteprima Risultati</h2>
          <div className="resultsContainer">
            {previewResults.map(item => resultItemTemplate(item))}
          </div>
        </Fragment>
      )}

      {searchResults?.length === 0 && (
        <div className="text-warning">No results found</div>
      )}

      {searchResults?.length > 0 && !error && (
        <Fragment>
          <h1 className="mt-5">Results</h1>
          <div className="resultsContainer">
            {searchResults.map(item => resultItemTemplate(item))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Search.propTypes = {
  source: sourcePropTypes.isRequired,
  resultItemTemplate: PropTypes.func,
  fieldList: PropTypes.object.isRequired,
  operators: PropTypes.object,
  connector: PropTypes.object,
}

export { Search }
