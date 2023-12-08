import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./pages/StripeCheckout";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedAdmin>
                    <AdminHome />
                  </ProtectedAdmin>
                }
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/cart"
                element={
                  <Protected>
                    <CartPage />
                  </Protected>
                }
              />
              <Route
                path="/checkout"
                element={
                  <Protected>
                    <CheckoutPage />
                  </Protected>
                }
              />
              <Route
                path="/product-detail/:id"
                element={
                  <Protected>
                    <ProductDetailPage />
                  </Protected>
                }
              />
              <Route
                path="/admin/product-detail/:id"
                element={
                  <ProtectedAdmin>
                    <AdminProductDetailPage />
                  </ProtectedAdmin>
                }
              />{" "}
              <Route
                path="/admin/product-form"
                element={
                  <ProtectedAdmin>
                    <AdminProductFormPage />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/product-form/edit/:id"
                element={
                  <ProtectedAdmin>
                    <AdminProductFormPage />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedAdmin>
                    <AdminOrdersPage />
                  </ProtectedAdmin>
                }
              />
              <Route path="/order-success/:id" element={<OrderSuccessPage />} />
              <Route path="/my-orders" element={<UserOrderPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="forgot-password"
                element={<ForgotPasswordPage />}
              />{" "}
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route
                path="stripe-checkout"
                element={
                  <Protected>
                    <StripeCheckout />
                  </Protected>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      )}
    </div>
  );
}

export default App;
