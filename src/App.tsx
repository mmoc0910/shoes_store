import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
const SigninPage = lazy(() => import("./pages/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
// const OrderPage = lazy(() => import("./pages/OrderPage"));

function App() {
  return (
    <>
      <Suspense
      // fallback={
      //   <div className="flex items-center justify-center w-screen h-screen">
      //     loading
      //   </div>
      // }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/list-product" element={<ProductsPage />} />
            <Route
              path="/product/:product_id"
              element={<ProductDetailPage />}
            />
            <Route
              path="/cart"
              element={<CartPage />}
            />
            {/* <Route
              path="/order"
              element={<OrderPage />}
            /> */}
          </Route>
          <Route path="/sign-in" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center w-screen h-screen text-3xl font-semibold">
                404 Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
