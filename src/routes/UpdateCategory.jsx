/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
const UpdateCategory = () => {
  
  const [formData, setFormData] = useState({
    categoryId: 0, 
    categoryName: '',
    categoryDescription: '', 
    categoryImage: '', 
  });

  const params = useParams();
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch(`https://localhost:7008/api/Category/GetCategoryById/${params.categoryId}`)
    .then((r) => r.json())
    .then(resp => setFormData(resp))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    fetch(`https://localhost:7008/api/Category/UpdateById/${params.categoryId}`, {
      method: "PUT",
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
      [event.target.id]: event.target.value
    });

    console.log('hi',formData)
  }
  
  return (
    <>
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
          <h2>Update Category</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="categoryName">Category name</label>
            <input
              value={formData.categoryName}
              onChange={(event) => handleChange(event)}
              id="categoryName"
              placeholder="Menu Name..."
              name="CategoryName"
              type="text"
              style={{ m: 1, width: "100%" }}
            />
            <label htmlFor='categoryDescription'>Category Description</label>
            <textarea
              value={formData.categoryDescription}
              onChange={(event) => handleChange(event)}
              id="categoryDescription"
              placeholder="Category Description..."
              name="CategoryDescription"
              type="text"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="categoryImage">Category Image</label>
            <input
              onChange={(event) => handleFileChange(event)}
              id="categoryImage"
              placeholder="Select Category Image"
              name="CategoryImageFile"
              type="file"
              style={{ m: 1, width: "100%" }}
            />
            <br />
            <button>Update category</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateCategory