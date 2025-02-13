import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import App from "./App.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Check from "./pages/check/Check.jsx";
import Confirm from "./pages/confirm/Confirm.jsx";
import PageError from "./pages/PageError.jsx";
// import { ErrorBoundary } from "react-error-boundary";

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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/:merchant"
      element={
        // <ErrorBoundary FallbackComponent={Fallback}>
        // </ErrorBoundary>
          <App />
      }
      errorElement={<PageError />}
    >
      <Route index element={<Navigate to="./order" replace />} />
      <Route path="order" element={<Order />} />
      <Route path="cart" element={<Cart />} />
      <Route path="check" element={<Check />} />
      <Route path="confirm/:orderID" element={<Confirm />} />
    </Route>
  )
);

export default router;
