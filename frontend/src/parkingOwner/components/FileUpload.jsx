// src/components/FileUpload.js
import React, { useState, useEffect } from "react";
import "../styles/FileUpload.css";

const FileUpload = ({ onFilesChange, initialFiles }) => {
  const [files, setFiles] = useState([]);


const REACT_APP_IMAGE_BASE_URL = "http://localhost:5000";
  useEffect(() => {
    if (initialFiles) {
      const formattedFiles = initialFiles.map((file) => ({
        fileName: file,
        previewURL: `${REACT_APP_IMAGE_BASE_URL}/${file}`, // Assuming you have a base URL for images
        isNew: false, // Indicates that these are existing files
        
      }));
      setFiles(formattedFiles);
      
    }
  }, [initialFiles]);
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4 - files.length);
    const filePreviews = selectedFiles.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
      isNew: true,
    }));
  
    // Concatenate existing files with new files
    const updatedFiles = [...files, ...filePreviews];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // Notify parent component
  };
  
  const handleRemove = (fileToRemove) => {
    if (fileToRemove.isNew) {
      URL.revokeObjectURL(fileToRemove.previewURL); // Cleanup URL object
    }
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // Notify parent component
    
  }

  return (
    <div className="upload-container">
      <div
        className="upload-area"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <i className="fas fa-cloud-upload-alt"></i>
        <p>Drag & Drop your images here or click to select files</p>
        <input
          type="file"
          id="fileInput"
          name="files"
          multiple
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <img src={file.previewURL} alt={`Preview ${index}`} />
            <button className="remove-btn" onClick={() => handleRemove(file)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
