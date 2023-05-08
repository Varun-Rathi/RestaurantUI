// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadCategory = () => {

  const params = useParams();

  const [formData, setFormData] = useState({
    CategoryName: 0, 
    CategoryDescription: '',
  });

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });


    fetch(`https://localhost:7008/api/Category/CreateCategory?MenuId=${params.id}`, {
      method: "post",
      body: data,
    }).then(response => {
      if(response?.status === 200)
        navigate('/');
      else
        alert("Enter valid details")
    })
  };

  

  const handleFileChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.files?.[0]
    });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value
    });

    console.log('hi',formData)
  }
  

  
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "90vh",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            padding: "2rem",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <h2>Upload Category</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="categoryName">Category name</label>
            <input
              value={formData.CategoryName}
              onChange={(event) => handleChange(event)}
              id="categoryName"
              placeholder="Category Name..."
              name="CategoryName"
              type="text"
              style={{ m: 1, width: "100%" }}
            />
            <label htmlFor="productPrice/">Category Description</label>
            <input
              value={formData.CategoryDescription}
              onChange={(event) => handleChange(event)}
              id="categoryDescription"
              placeholder="Category Description..."
              name="CategoryDescription"
              type="text"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="categoryImageFile">Category Image</label>
            <input
              onChange={(event) => handleFileChange(event)}
              id="categoryImageFile"
              placeholder="Select category Image"
              name="CategoryImageFile"
              type="file"
              style={{ m: 1, width: "100%" }}
            />
            <button>Upload category</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCategory;
