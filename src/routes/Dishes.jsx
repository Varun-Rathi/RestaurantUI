import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../components/menu-item.css';
import Navbar from '../components/Navbar';
const Dishes = () => {

  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
//   {
//     "dishId": 14,
//     "dishName": "curry",
//     "dishDescription": "tasty",
//     "dishPrice": 100,
//     "dishImage": "https://megaprojectsaccount.blob.core.windows.net/varuncontainer/images_caa9.png",
//     "dishImageFile": null,
//     "dishNature": "veg",
//     "isDeleted": false,
//     "categoryDishes": null
// }
  useEffect(() => {
    (async () => {
      fetch(`https://localhost:7008/api/Dish/GetDishesByCategory/${params.categoryId}`)
      .then(r => r.json())
      .then(setDishes);
    })();
  }, []);

  const handleDelete = (dishId) => {
    if (confirm("Want to delete the dish?")) {
      fetch(`https://localhost:7008/api/Dish/DeleteDish/${dishId}`, {
        method: "DELETE",
      }).then((r) => setResponse(r.status));
      alert("Product deleted");
      location.reload();
    }
  }

  const handleUpdate = (dishId) => {
    navigate(`/menu/${params?.id}/category/${params?.categoryId}/dish/${dishId}`);
  }
  
  return (
    <>
    <Navbar setMenus={setDishes} route={`/menu/${params.id}/category/${params.categoryId}/dish/upload`}/>
    <div className='items'>
      {dishes.length > 0 &&  dishes.map((dish) => {
        return (
          <>
            <div className='card'>
              <Link to={`/menu/${params?.id}/category/${params?.categoryId}/dish/${dish.dishId}`}>
                <img src={dish?.dishImage} alt="dish" />
                <div className="details">
                  <h2 className="title">{dish?.dishName}</h2>
                  <h2 className="title">₹ {dish?.dishPrice} /-</h2>
                  <h6 className="title">Description: {dish?.dishDescription}</h6>
                  <h4 className="title">Nature: {dish?.dishNature} </h4>
                </div>
              </Link>
              <button onClick={() => handleDelete(dish.dishId)}>Delete</button>
              <br />
              <br />
              <button onClick={() => handleUpdate(dish.dishId)}>Update</button>
            </div>
          </>
        )
      })}
    </div>
  </>
  )
}

export default Dishes