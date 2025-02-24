import React from "react";

const DownloadPdf = ({ filePath, fileName, children }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="btn btn-link text-primary" onClick={handleDownload}>
      {children}
    </button>
  );
};

export default DownloadPdf;
