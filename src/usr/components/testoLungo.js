import React, { useState } from "react";

const TestoLungo = ({ inputText, previewLength = 300, jsxContent = null }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {/* Mostra solo il testo HTML, senza componenti React */}
      <div dangerouslySetInnerHTML={{ __html: expanded ? inputText : inputText.substring(0, previewLength) + "..." }} />

      {/* Qui vengono renderizzati eventuali componenti JSX come <DownloadPdf> */}
      {jsxContent}

      <button className="btn btn-link mt-2" onClick={toggleText}>
        {expanded ? "Mostra meno" : "Leggi tutto"}
      </button>
    </div>
  );
};

export default TestoLungo;
