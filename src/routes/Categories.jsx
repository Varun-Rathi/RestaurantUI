import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../components/menu-item.css';
import Navbar from '../components/Navbar';
const Categories = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => { 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://localhost:7008/api/Category/GetAllRecords/${parseInt(params?.id)}`,
      requestOptions,
    )
      .then((r) => r.json())
      .then((categories) => {
        setCategories(categories);
      });
  }, [])

  const handleDelete = (categoryId) => {
    if (confirm("Want to delete the category?")) {
      fetch(`https://localhost:7008/api/Category/deletebyid/${categoryId}`, {
        method: "DELETE",
      }).then((r) => setResponse(r.status));
      alert("Product deleted");
      location.reload();
    }
  }

  const handleUpdate = (menuId, categoryId) => {
    navigate(`/menu/${menuId}/category/${categoryId}/update`)
  }

  return (
    <>
    <Navbar setMenus={setCategories} route={`/menu/${params.id}/category/upload`}/>
      <div className='items'>
        {
          categories.map((category) => {
            return (
              <>
                <div className='card'>
                  <Link to={`/menu/${params?.id}/category/${category?.categoryId}/dishes`}>
                    <img src={category?.categoryImage} alt="category" />
                    <div className="details">
                      <h2 className="title">{category?.categoryName}</h2>
                    </div>
                  </Link>
                  <button onClick={() => handleDelete(category?.categoryId)}>Delete</button>
                  <br />
                  <br />
                  <button onClick={() => handleUpdate(params?.id, category?.categoryId)}>Update</button>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Categories