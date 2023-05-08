/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ setMenus = null, route = '/uploadMenu'}) => {
  const [query, setQuery] = useState("")

  const navigate = useNavigate();
  const aborter = useRef(null)

  const search = () => {
    aborter.current?.abort()
    aborter.current = new AbortController();

    fetch(`https://localhost:7008/api/Dish/SearchByDishName/searchTerm=${DishName}`, {
      signal: aborter.current.signal
    })
      .then(res => res.json())
      .then(setMenus)
      .catch(console.log)
  }


  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return (
    <div className="navbarcontainer">
      <div className="contentLeftItems">
        <img
          src="https://www.techbuy.in/wp-content/uploads/2020/09/flipkart-logo-3F33927DAA-seeklogo.com_.svg"
          alt="Scan button"
          height="30px"
          width="30px"
        />
        <Link to="/">
          <h3>Foodcart</h3>
        </Link>
      </div>
      <div className="contentRightItems">
        {setMenus &&
          <>
            <input type="text" placeholder="Search Items" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={search}>Search</button>
          </>
        }
        <button onClick={() => navigate(route)}>Upload</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
