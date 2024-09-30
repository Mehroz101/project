import React, { useState, useEffect } from "react";
import "../styles/FileUpload.css";

const UpdateFile = ({ onFilesChange, initialFiles }) => {
  const REACT_APP_IMAGE_BASE_URL =import.meta.env.REACT_APP_API_URL;

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  // Set initial existing images
  useEffect(() => {
    if (initialFiles) {
      setExistingImages(initialFiles); // Limit to 4 images
      setImages(initialFiles);
    }
  }, [initialFiles]);

  // Handle image removal and update states
  //   const handleImageRemove = (image, isExisting) => {
  //     if (isExisting) {
  //       setRemoveImages([...removeImages, image]);
  //       setExistingImages(existingImages.filter((img) => img !== image));
  //     }
  //     setImages(images.filter((img) => img !== image));
  //   };

  // Handle new image selection, ensuring total images don't exceed 4
  const handleNewImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log("selectedFiles");
    console.log(selectedFiles.map((file)=>file.name));
    console.log(selectedFiles);
    console.log("initialFiles");
    console.log(initialFiles);
    // Combine existing and new images, ensuring the total does not exceed 4
    const newImages = selectedFiles.slice(0, 4 - existingImages.length);

    // Generate previews for the new images
    const previews = newImages.map((file) => URL.createObjectURL(file));

    // Update state while maintaining the 4 image limit
    setNewImagePreviews(previews);
    setImages([...existingImages, ...newImages]);
    onFilesChange([...existingImages, ...newImages]);
  };

  return (
    // <div className="upload-container">
    //   <div
    //     className="upload-area"
    //     onClick={() => document.getElementById("fileInput").click()}
    //   >
    //     <i className="fas fa-cloud-upload-alt"></i>
    //     <p>Drag & Drop your images here or click to select files (Max 4)</p>
    //     <input
    //       type="file"
    //       id="fileInput"
    //       name="files"
    //       multiple
    //       accept="image/*"
    //       onChange={handleNewImageChange}
    //       style={{ display: "none" }}
    //     />
    //   </div>
    //   <div className="file-list">
    //     {/* Display existing images */}
    //     {existingImages.map((image, index) => (
    //       <div key={index} className="file-item">
    //         <img
    //           src={`${REACT_APP_IMAGE_BASE_URL}/${image}`}
    //           alt={`Existing Preview ${index}`}
    //         />
    //         <button
    //           className="remove-btn"
    //           onClick={() => handleImageRemove(image, true)}
    //         >
    //           <i className="fas fa-times"></i>
    //         </button>
    //       </div>
    //     ))}

    //     {/* Display new image previews */}
    //     {/* {newImagePreviews.map((preview, index) => (
    //       <div key={`new-${index}`} className="file-item">
    //         <img src={preview} alt={`New Preview ${index}`} />
    //         <button
    //           className="remove-btn"
    //           onClick={() => {
    //             setNewImagePreviews(
    //               newImagePreviews.filter((_, i) => i !== index)
    //             );
    //             setImages(images.filter((_, i) => i !== images.length + index));
    //           }}
    //         >
    //           <i className="fas fa-times"></i>
    //         </button>
    //       </div>
    //     ))} */}
    //   </div>
    // </div>
  );
};

export default UpdateFile;
