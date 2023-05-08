/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
const UpdateDish = () => {
  // {
  //   "dishId": 15,
  //   "dishName": "currychola",
  //   "dishDescription": "khalo",
  //   "dishPrice": 100,
  //   "dishImage": "https://megaprojectsaccount.blob.core.windows.net/varuncontainer/images_170f_7b8c.png",
  //   "dishImageFile": null,
  //   "dishNature": "veg",
  //   "isDeleted": false,
  //   "categoryDishes": null
  // }
  const [formData, setFormData] = useState({
    dishId: 0,
    dishName: '',
    dishDescription: '',
    dishPrice: 0,
    dishImage: '',
    dishNature: ''
  });

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://localhost:7008/api/Dish/GetDishesById/${params.dishId}`)
      .then((r) => r.json())
      .then(resp => setFormData(resp))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    fetch(`https://localhost:7008/api/Dish/UpdateByDishId/${params.dishId}`, {
      method: "PUT",
      body: data,
    }).then(response => {
      if (response?.status === 200)
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

    console.log('hi', formData)
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
            <h2>Update Dish</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

              <label htmlFor="dishName">Dish name</label>
              <input
                value={formData.dishName}
                onChange={(event) => handleChange(event)}
                id="dishName"
                placeholder="Dish Name..."
                name="DishName"
                type="text"
                style={{ m: 1, width: "100%" }}
              />
              <label htmlFor='dishDescription'>Dish Description</label>
              <textarea
                value={formData.dishDescription}
                onChange={(event) => handleChange(event)}
                id="dishDescription"
                placeholder="Dish Description..."
                name="DishDescription"
                type="text"
                style={{ m: 1, width: "100%" }}
              />

              <label htmlFor='dishPrice'>Dish Price</label>
              <textarea
                value={formData.dishPrice}
                onChange={(event) => handleChange(event)}
                id="dishPrice"
                placeholder="Dish Price..."
                name="DishPrice"
                type="number"
                style={{ m: 1, width: "100%" }}
              />

              <label htmlFor='dishNature'>Dish Nature</label>
              <textarea
                value={formData.dishNature}
                onChange={(event) => handleChange(event)}
                id="dishNature"
                placeholder="Dish Nature..."
                name="DishNature"
                type="text"
                style={{ m: 1, width: "100%" }}
              />

              <label htmlFor="dishImage">Dish Image</label>
              <input
                onChange={(event) => handleFileChange(event)}
                id="dishImage"
                placeholder="Select Dish Image"
                name="DishImageFile"
                type="file"
                style={{ m: 1, width: "100%" }}
              />
              <br />
              <button>Update Dish</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateDish