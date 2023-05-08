// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadDish = () => {
  const [formData, setFormData] = useState({
    DishName: '', 
    DishDescription: '', 
    DishPrice: 0,
    DishImageFile: '',
    DishNature:'',
   
  });

  const params = useParams();
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    fetch(`https://localhost:7008/api/Dish/createDishByCategory/?categoryId=${params.categoryId}`, {
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
  }

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value
    });
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
          <h2>Upload Dish</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="dishName">Dish name</label>
            <input
              value={formData.MenuName}
              onChange={(event) => handleChange(event)}
              id="dishName"
              placeholder="Dish Name..."
              name="DishName"
              type="text"
              style={{ m: 1, width: "100%" }}
            />
            <label htmlFor="dishDescription/">Dish description</label>
            <input
              value={formData.DishDescription}
              onChange={(event) => handleChange(event)}
              id="dishDescription"
              placeholder="Dish description..."
              name="DishDescription"
              type="text"
              style={{ m: 1, width: "100%" }}
            />


             <label htmlFor="dishPrice">Dish price</label>
            <input
              value={formData.DishPrice}
              onChange={(event) => handleChange(event)}
              id="dishPrice"
              placeholder="Dish price..."
              name="DishPrice"
              type="number"
              style={{ m: 1, width: "100%" }}
            />


            <label htmlFor="dishNature">Dish nature</label>
            <input
              value={formData.DishNature}
              onChange={(event) => handleChange(event)}
              id="dishNature"
              placeholder="Dish nature..."
              name="DishNature"
              type="text"
              style={{ m: 1, width: "100%" }}
            />


            <label htmlFor="dishImageFile">Dish Image</label>
            <input
              onChange={(event) => handleFileChange(event)}
              id="dishImageFile"
              placeholder="Select Dish Image"
              name="DishImageFile"
              type="file"
              style={{ m: 1, width: "100%" }}
            />

            <button>Upload dish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDish;
