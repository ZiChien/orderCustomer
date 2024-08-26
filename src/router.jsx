import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Check from './pages/check/Check.jsx';
import Confirm from './pages/confirm/Confirm.jsx';

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
    <Route path="/:merchant"
        element={<App />}
        errorElement = {<div>404找不到店家</div>}
    >
        <Route path="order" element={<Order />} />
        <Route path="cart" element={<Cart />} />
        <Route path="check" element={<Check />} />
        <Route path="confirm" element={<Confirm />} />
    </Route>
))

export default router;