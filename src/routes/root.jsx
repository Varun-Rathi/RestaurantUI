import "./root.css";

import MenuItem from "../components/MenuItem";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const RECORDS_PER_PAGE = 10;

const Root = () => {
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    }
    const aborter = new AbortController();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://localhost:7008/api/Menu/GetAllRecords`,
      requestOptions,
      {
        signal: aborter.signal,
      }
    )
      .then((r) => r.json())
      .then((menus) => {
        setMenus(menus);
      });

    return () => {
      aborter.abort();
    };
  }, [page]);

  useEffect(() => {
    console.log(menus.length)
  }, [menus])


  
  
  
  return (
    <div>
      <Navbar setMenus={setMenus} route={'/uploadMenu'}/>
      <main>
        {menus.length > 0 ? (
          <div className="products">
            {menus.map((menu) => (
              <MenuItem
                key={menu.menuId}
                id={menu.menuId}
                name={menu.menuName}
                description={menu.menuDescription}
                image={menu.menuImagePath}
                
              />
            ))}
          </div>
        ) : (
          <div className="empty">No Item</div>
        )}
      </main>
    </div>
  );
};

export default Root;
