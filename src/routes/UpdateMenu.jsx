/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
const UpdateMenu = () => {

  // {
  //   "menuId": 5,
  //   "menuName": "Breakfast",
  //   "menuDescription": "come here",
  //   "menuImagePath": "https://megaprojectsaccount.blob.core.windows.net/varuncontainer/images_0fb0.png",
  //   "menuImage": null,
  //   "isDeleted": false,
  //   "menuCategories": null
  // }
  const [formData, setFormData] = useState({
    menuId: 0, 
    menuName: '',
    menuDescription: '', 
    menuImagePath: '', 
  });

  const params = useParams();
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch(`https://localhost:7008/api/Menu/GetById/${params.id}`)
    .then((r) => r.json())
    .then(resp => setFormData(resp))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(); 
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // data.append('UserName', localStorage.getItem('username'));

    fetch(`https://localhost:7008/api/Menu/UpdateById/${params.id}`, {
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
          <h2>Update Menu</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <label htmlFor="menuName">Menu name</label>
            <input
              value={formData.menuName}
              onChange={(event) => handleChange(event)}
              id="menuName"
              placeholder="Menu Name..."
              name="MenuName"
              type="text"
              style={{ m: 1, width: "100%" }}
            />
            <label htmlFor='menuDescription'>Menu Description</label>
            <textarea
              value={formData.menuDescription}
              onChange={(event) => handleChange(event)}
              id="menuDescription"
              placeholder="Menu Description..."
              name="MenuDescription"
              type="text"
              style={{ m: 1, width: "100%" }}
            />

            <label htmlFor="menuImage">Menu Image</label>
            <input
              onChange={(event) => handleFileChange(event)}
              id="menuImage"
              placeholder="Select Menu Image"
              name="MenuImageFile"
              type="file"
              style={{ m: 1, width: "100%" }}
            />
            <button>Update</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateMenu