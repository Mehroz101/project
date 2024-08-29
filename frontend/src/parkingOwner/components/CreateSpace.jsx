import React from "react";
import "../styles/CreateSpace.css";
import FileUpload from "./FileUpload";
const CreateSpace = () => {
  return (
    <>
      <div className="create_space">
        <h2>Create New Space</h2>
        <div className="space_detail_text">
          <div className="booking_detail_top"></div>
          <div className="input_box">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Enter title" />
          </div>
          <div className="input_box">
            <label htmlFor="short_description">Short Description</label>
            <input type="text" placeholder="maximum 10-15 words " />
          </div>
          <div className="input_box">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              placeholder="maximum 150 words"
            ></textarea>
          </div>
        </div>
        <div className="file_upload">
          <FileUpload />
        </div>
        <div className="features">
          <h2>Features</h2>
          <div className="features_container">
            <div className="input_combo_box">
              <div className="input_box">
                <label htmlFor="cctv">CCTV</label>
                <input type="checkbox" id="cctv"/>
              </div>
              <div className="input_box">
                <label htmlFor="underground">Underground</label>
                <input type="checkbox" id="underground"/>
              </div>
              <div className="input_box">
                <label htmlFor="secure">Secure</label>
                <input type="checkbox" id="secure"/>
              </div>
             
            </div>
          
          </div>
        </div>
        <div className="pricing">
          <h2>Pricing</h2>
          <div className="input_combo_box">
            <div className="input_box">
              <label htmlFor="per_hour">Per Hour</label>
              <input type="numer" placeholder="" />
            </div>
            <div className="input_box">
              <label htmlFor="per_day">Per Day</label>
              <input type="numer" placeholder="" />
            </div>
          </div>

        </div>
     
        <button className="list_space">List New Space</button>
      </div>
    </>
  );
};

export default CreateSpace;
