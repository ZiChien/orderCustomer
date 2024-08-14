import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Check from './pages/check/Check.jsx';

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//     },
//     {
//         path: '/order',
//         element: <Order />,
//     },
//     {
//         path: '/cart',
//         element: <Cart />,
//     }
// ]);
const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route path="order" element={<Order />} />
        <Route path="cart" element={<Cart />} />
        <Route path="check" element={<Check />} />
    </Route>
))

export default router;