// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadMenu = () => {
  const [formData, setFormData] = useState({
    MenuName: '', 
    MenuDescription: '', 
    MenuImage: '',
   
  });

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append('UserName', localStorage.getItem('username'));

    fetch(`https://localhost:7008/api/Menu/CreateMenu`, {
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

  // useEffect(() => {
  //   if(localStorage.getItem('isAuthenticated') === "true")
  //     navigate('/');
  //   else if (localStorage.getItem('isAuthenticated') === "false")
  //   navigate('/login');
  // }, [])
  

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
          <h2>Upload Menu</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="menuName">Menu name</label>
            <input
              value={formData.MenuName}
              onChange={(event) => handleChange(event)}
              id="menuName"
              placeholder="Menu Name..."
              name="MenuName"
              type="text"
              style={{ m: 1, width: "100%" }}
            />
            <label htmlFor="menuDescription/">Menu description</label>
            <input
              value={formData.MenuDescription}
              onChange={(event) => handleChange(event)}
              id="menuDescription"
              placeholder="Menu description..."
              name="MenuDescription"
              type="text"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="menuImage">Menu Image</label>
            <input
              onChange={(event) => handleFileChange(event)}
              id="menuImage"
              placeholder="Select Menu Image"
              name="MenuImage"
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

export default UploadMenu;
