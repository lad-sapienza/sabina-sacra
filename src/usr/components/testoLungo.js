import React, { useState } from "react";

const TestoLungo = ({ inputText, previewLength = 300, isHtml = false }) => {
  const [expanded, setExpanded] = useState(false);

  // Se il testo è inferiore al limite, mostriamo tutto senza pulsante
  const shouldCollapse = inputText.length > previewLength;
  const displayText = expanded || !shouldCollapse 
    ? inputText 
    : inputText.substring(0, previewLength) + "...";

  return (
    <div>
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: displayText }} />
      ) : (
        <p>{displayText}</p>
      )}
      
      {/* Mostra "Leggi tutto" solo se il testo supera il limite */}
      {shouldCollapse && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="btn btn-link p-0"
        >
          {expanded ? "Nascondi" : "Leggi tutto"}
        </button>
      )}
    </div>
  );
};

export default TestoLungo;
