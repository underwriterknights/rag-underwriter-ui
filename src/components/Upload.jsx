import React from "react";
import { useState } from "react";   
import "../styles/Upload.css";


export const UploadComponent = (props) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      props.onFileUpload(file);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="upload-component">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}