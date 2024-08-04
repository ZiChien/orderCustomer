import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/order',
        element: <Order />,
    },
    {
        path: '/cart',
        element: <Cart />,
    }
]);

export default router;