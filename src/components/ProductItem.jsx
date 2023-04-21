/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./product-item.css"

const ProductItem = ({ id, name, price, image }) => {
  return (
    <div className="card">
      <Link to={`product/${id}`}>
        <img src={image} />
        <div className="details">
          <h2 className="title">{name}</h2>
          <div className="price">₹ {price}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem;


