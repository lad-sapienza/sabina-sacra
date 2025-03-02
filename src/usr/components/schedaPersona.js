import React from "react";

const SchedaPersona = ({ colore, image, nome, linkAcademia, linkSapienza }) => {
  return (
    <div className="card shadow-lg" style={{
      backgroundColor: colore || "#e0f1ff", 
      position: "relative", 
      width: "100%", 
      padding: "20px", 
      borderRadius: "15px", 
      border: "none", // Rimosso il bordo
      opacity: "0.75",  // Iniziamo con trasparenza al 75%
      marginBottom: "15px", 
      transition: "opacity 0.3s ease-in-out"
    }} 
    onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} // Opacità a 100% al passaggio del mouse
    onMouseLeave={(e) => e.currentTarget.style.opacity = "0.75"} // Ritorna a 75% quando il mouse esce
    >

      <div className="card" style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "0" }}>
        <img src={image} alt={nome} style={{ width: "120px", height: "120px", borderRadius: "50%", display: "block", margin: "0 auto" }} />
      </div>

      <h5 style={{ 
        textAlign: "center", 
        color: "white", 
        marginTop: "20px", 
        fontSize: "1.5rem", 
        fontWeight: "600", 
        textShadow: "2px 2px 5px black" // Aggiunta del bordo nero al testo
      }}>
        {nome}
      </h5>

      <div style={{ textAlign: "center", marginTop: "15px", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {linkAcademia && (
            <a href={linkAcademia} target="_blank" style={{ marginRight: "10px" }}>
              <img src="https://a.academia-assets.com/images/academia-logo-2021.svg" alt="Academia" style={{ width: "20px", marginRight: "10px" }} />
            </a>
          )}
          {linkSapienza && (
            <a href={linkSapienza} target="_blank" style={{ marginLeft: "10px" }}>
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f4f6a8ab-3e97-421d-922f-d1600d3b4cee/dfln50p-c2bc4a6a-94c4-4220-b343-ecbf1b565a38.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y0ZjZhOGFiLTNlOTctNDIxZC05MjJmLWQxNjAwZDNiNGNlZVwvZGZsbjUwcC1jMmJjNGE2YS05NGM0LTQyMjAtYjM0My1lY2JmMWI1NjVhMzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bJcWbGtowCRvHF4tpNJqBi2izSi67uhPxF1adhQOpmk" alt="Sapienza" style={{ width: "20px", marginLeft: "10px" }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedaPersona;
