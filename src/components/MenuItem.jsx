/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import "./menu-item.css";
import { useState } from "react";

const MenuItem = ({ id, name, description, image }) => {
  const [response, setResponse] = useState("");
  const navigate = useNavigate(); 
  const handleDelete = (id) => {
    // debugger;
    if (confirm("Want to delete the product?")) {
      fetch(`https://localhost:7008/api/Menu/deletebyid/${id}`, {
        method: "DELETE",
      }).then((r) => setResponse(r.status));
      alert("Product deleted");
      location.reload();
    }
  };

  const handleUpdate = () => {
    navigate(`/update/menu/${id}`);
  }

  
  return (
    <div className="card">
      <Link to={`menu/${id}/categories`}>
        <img src={image} />
        <div className="details">
          <h2 className="title">{name}</h2>
        </div>
      </Link>
      <button onClick={() => handleDelete(id)}>Delete</button>
      <br />
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default MenuItem;
