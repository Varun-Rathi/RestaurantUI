import "./root.css";

import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const RECORDS_PER_PAGE = 10;


const Root = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const navigate = useNavigate(); 
  
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    const aborter = new AbortController();

    fetch(
      `https://localhost:7095/api/Furniture/getRecords?PageNumber=${page}&PageSize=${RECORDS_PER_PAGE}`,
      {
        signal: aborter.signal,
      }
    )
      .then((r) => r.json())
      .then(([products, maxPage]) => {
        setProducts(products);
        setMaxPage(maxPage);
      });

    return () => {
      aborter.abort();
    };
  }, [page]);

  return (
    <div>
      <Navbar setProducts={setProducts} />
      <main>
        {products.length > 0 ? (
          <div className="products">
            {products.map((product) => (
              <ProductItem
                key={product.productId}
                id={product.productId}
                name={product.productName}
                price={product.productPrice}
                image={product.displayImagePath}
              />
            ))}
          </div>
        ) : (
          <div className="empty">No Item</div>
        )}
        <div className="page-step">
          <button
            style={{
              visibility: page > 1 ? "visible" : "hidden",
            }}
            onClick={() => setPage((page) => page - 1)}
          >
            Previous
          </button>
          <button
            style={{
              visibility: page === maxPage ? "hidden" : "visible",
            }}
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Root;
