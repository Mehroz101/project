// src/components/CreateSpace.js
import React, { useEffect, useState } from 'react';
import "../styles/CreateSpace.css";
import { useCreateSpaceForm } from "../../services/useCreateSpaceForm";
import FileUpload from "./FileUpload";

const CreateSpace = () => {
  const { spaceDetails, handleChange, handleSubmit } = useCreateSpaceForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
    console.log('Files received from FileUpload:', files); // Log the files to the console
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    handleSubmit(uploadedFiles);
  };
  // useEffect(() => {
  //   console.log('Uploaded files:', uploadedFiles);
  // }, [uploadedFiles]);

  return (
    <div className="create_space">
      <h2>Create New Space</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="space_detail_text">
          <div className="input_box">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={spaceDetails.title}
              onChange={handleChange}
            />
          </div>
          <div className="input_box">
            <label htmlFor="short_description">Short Description</label>
            <input
              type="text"
              name="short_description"
              placeholder="Maximum 10-15 words"
              value={spaceDetails.short_description}
              onChange={handleChange}
            />
          </div>
          <div className="input_box">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Maximum 150 words"
              value={spaceDetails.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="file_upload">
          <FileUpload onFilesChange={handleFilesChange} />
        </div>
        <div className="features">
          <h2>Features</h2>
          <div className="features_container">
            <div className="input_combo_box">
              <div className="input_box">
                <label htmlFor="cctv">CCTV</label>
                <input
                  type="checkbox"
                  name="features"
                  value="cctv"
                  onChange={handleChange}
                />
              </div>
              <div className="input_box">
                <label htmlFor="underground">Underground</label>
                <input
                  type="checkbox"
                  name="features"
                  value="underground"
                  onChange={handleChange}
                />
              </div>
              <div className="input_box">
                <label htmlFor="secure">Secure</label>
                <input
                  type="checkbox"
                  name="features"
                  value="secure"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="location">
          <h2>Location</h2>
          <div className="input_combo_box">
            <div className="input_box">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                placeholder=""
                value={spaceDetails.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                placeholder=""
                value={spaceDetails.latitude}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="pricing">
          <h2>Pricing</h2>
          <div className="input_combo_box">
            <div className="input_box">
              <label htmlFor="per_hour">Per Hour</label>
              <input
                type="number"
                name="per_hour"
                placeholder=""
                value={spaceDetails.per_hour}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label htmlFor="per_day">Per Day</label>
              <input
                type="number"
                name="per_day"
                placeholder=""
                value={spaceDetails.per_day}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="list_space">List New Space</button>
      </form>
    </div>
  );
};

export default CreateSpace;
