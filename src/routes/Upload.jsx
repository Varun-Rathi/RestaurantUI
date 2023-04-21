// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Upload = () => {
  const [formData, setFormData] = useState({
    ProductName: '', 
    ProductPrice: 0, 
    DisplayImage: '',
    SideView: '',
    AerialView: '',
    BackView: '',
  });

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // [key, value]
    // [key1, value1]
    console.log(data);
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };
    
    fetch(`https://localhost:7095/api/Furniture/CreateProduct`, {
      method: "post",
      body: data,
      // headers: config.headers
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

    // console.log('hi',formData)
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
          <h2>Upload Product</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="productName">Product name</label>
            <input
              value={formData.ProductName}
              onChange={(event) => handleChange(event)}
              id="productName"
              placeholder="Product Name..."
              name="ProductName"
              type="text"
              style={{ m: 1, width: "100%" }}
            />
            <label htmlFor="productPrice/">Product price</label>
            <input
              value={formData.ProductPrice}
              onChange={(event) => handleChange(event)}
              id="productPrice"
              placeholder="Product price..."
              name="ProductPrice"
              type="number"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="displayImage">Display Image</label>
            <input
              onChange={(event) => handleFileChange(event)}
              id="displayImage"
              placeholder="Select Display Image"
              name="DisplayImage"
              type="file"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="sideImage">SideView Image</label>
            <input
              id="sideImage"
              onChange={(event) => handleFileChange(event)}
              placeholder="Select SideView Image"
              name="SideView"
              type="file"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="aerialImage">AerialView Image</label>
            <input
              id="aerialImage"
              onChange={(event) => handleFileChange(event)}
              placeholder="Select Aerialview Image"
              name="AerialView"
              type="file"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="backViewImage">BackView Image</label>
            <input
              id="backViewImage"
              onChange={(event) => handleFileChange(event)}
              placeholder="Select backView Image"
              name="BackView"
              type="file"
              style={{ m: 1, width: "100%" }}
            />

            <button>Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
