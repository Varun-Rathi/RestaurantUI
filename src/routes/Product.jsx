import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./product.css"

const Product = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState({});

  const [page, setPage] = useState(1);

  useEffect(() => {
    const aborter = new AbortController();

    fetch(`https://localhost:7095/api/Furniture/GetById/${productId}`, {
      signal: aborter.signal
    }).then(r => r.json()).then(setProduct)

    return () => {
      aborter.abort()
    }
  }, [productId])

  return <div>
    <Navbar />

    <main>
      <div className="container">
        <div className="left">
          <div>
            <img src={product.displayImagePath} />
            <img src={product.sideViewPath} />
          </div>
          <div>
            <img src={product.aerialViewPath} />
            <img src={product.backViewPath} />
          </div>
        </div>
        <div className="right">
          <h1>{product.productName}</h1>
          <p>₹ {product.productPrice}</p>
          <p> Furniture refers to movable objects intended to support various human activities such as seating (e.g., stools, chairs, and sofas), eating (tables), storing items, eating and/or working with an item, and sleeping (e.g., beds and hammocks).Furniture is also used to hold objects at a convenient height for work (as horizontal surfaces above the ground, such as tables and desks), or to store things (e.g., cupboards, shelves, and drawers). Furniture can be a product of design and can be considered a form of decorative art. In addition to furnitures functional role, it can serve a symbolic or religious purpose. It can be made from a vast multitude of materials, including metal, plastic, and wood. Furniture can be made using a variety of woodworking joints which often reflects the local culture. People have been using natural objects, such as tree stumps, rocks and moss, as furniture since the beginning of human civilization and continues today in some households/campsites. Archaeological research shows that from around 30,000 years ago, people started to construct and carve their own furniture, using wood, stone, and animal bones. Early furniture from this period is known from artwork such as a Venus figurine found in Russia, depicting the goddess on a throne. The first surviving extant furniture is in the homes of Skara Brae in Scotland, and includes cupboards, dressers and beds all constructed from stone. Complex construction techniques such as joinery began in the early dynastic period of ancient Egypt. This era saw constructed wooden pieces, including stools and tables, sometimes decorated with valuable metals or ivory. The evolution of furniture design continued in ancient Greece and ancient Rome, with thrones being commonplace as well as the klinai, multipurpose couches used for relaxing, eating, and sleeping. The furniture of the Middle Ages was usually heavy, oak, and ornamented. Furniture design expanded during the Italian Renaissance of the fourteenth and fifteenth century. The seventeenth century, in both Southern and Northern Europe, was characterized by opulent, often gilded Baroque designs. The nineteenth century is usually defined by revival styles. The first three-quarters of the twentieth century are often seen as the march towards Modernism. One unique outgrowth of post-modern furniture design is a return to natural shapes and textures</p>
        </div>
      </div>
    </main>
  </div>
}

export default Product;

// https://localhost:7095/api/Furniture/GetById/1


// {
//   "productId": 1,
//   "productName": "Table",
//   "displayImage": null,
//   "displayImagePath": "https://furniturecontainer.blob.core.windows.net/pawancontainer/Screenshot%20%281%29_e6ed.png",
//   "sideView": null,
//   "sideViewPath": "https://furniturecontainer.blob.core.windows.net/pawancontainer/Screenshot%20%2826%29_d124.png",
//   "aerialView": null,
//   "aerialViewPath": "https://furniturecontainer.blob.core.windows.net/pawancontainer/Screenshot%20%2840%29_04e5.png",
//   "backView": null,
//   "backViewPath": "https://furniturecontainer.blob.core.windows.net/pawancontainer/Screenshot%20%2856%29_8bb2.png",
//   "productPrice": 20000
// }