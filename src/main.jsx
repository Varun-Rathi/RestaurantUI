import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Root from './routes/root';
import ErrorPage from './error-page';
import Product from './routes/Product';
import Login from './routes/Login';
import Register from './routes/Register';
import UploadMenu from './routes/UploadMenu';
import UploadCategory from './routes/UploadCategory';
import UpdateMenu from './routes/UpdateMenu';
import Dishes from './routes/Dishes';
import Categories from './routes/Categories';
import UpdateCategory from './routes/UpdateCategory';
import UpdateDish from './routes/UpdateDish';
import UploadDish from './routes/UploadDish';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "update/menu/:id",
    element: <UpdateMenu />
  },
  {
    path: '/menu/:id/category/:categoryId/update',
    element: <UpdateCategory />
  },
  {
    path: '/menu/:id/category/:categoryId/dish/:dishId',
    element: <UpdateDish />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path:'/menu/:id/categories',
    element: <Categories />
  }, 
  {
    path:'/menu/:id/category/:categoryId/dishes',
    element: <Dishes />
  },
  {
    path: "/uploadMenu",
    element: <UploadMenu />
  },

  {
    path: "/menu/:id/category/upload",
    element: <UploadCategory />
  },

  {
    path: "/menu/:id/category/:categoryId/dish/upload",
    element: <UploadDish />
  },
  // {
  //   path: "/update/:id",
  //   element: <Update />
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={router} />
  </>
  // </React.StrictMode>,
)
