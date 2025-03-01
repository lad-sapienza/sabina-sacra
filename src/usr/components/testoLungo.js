import React, { useState } from "react";

const TestoLungo = ({ inputText = "ND", previewLength = 300, jsxContent = null }) => {
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse = inputText.length > previewLength; // Verifica se il testo è più lungo del limite
  const displayText = expanded || !shouldCollapse
    ? inputText
    : inputText.substring(0, previewLength) + "..."; // Tronca il testo solo se necessario

  return (
    <div>
      {/* Renderizza il testo come HTML, evitando di spezzare i tag */}
      <div dangerouslySetInnerHTML={{ __html: displayText }} />

      {/* Renderizza eventuali componenti JSX aggiuntivi, come <DownloadPdf> */}
      {jsxContent}

      {/* Mostra il pulsante solo se il testo supera la lunghezza del preview */}
      {shouldCollapse && (
        <button className="btn btn-link mt-2" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Mostra meno" : "Leggi tutto"}
        </button>
      )}
    </div>
  );
};

export default TestoLungo;
