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
import Upload from './routes/Upload';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "product/:productId",
    element: <Product />
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
    path: "/upload",
    element: <Upload />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
