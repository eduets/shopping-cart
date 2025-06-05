export { routes };
import { App } from "../App.jsx";
import { ErrorPage } from "../components/ErrorPage.jsx";
import { Home } from "../components/Home.jsx";
import { Shop } from "../components/Shop.jsx";
import { Cart } from "../components/Cart.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];
