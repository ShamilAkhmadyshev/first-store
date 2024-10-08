import React, { useState } from "react";
import "bootstrap";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout";
import MainProductsPage from "../components/mainProductsPage";
import ProductPage from "../components/productPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration";
import AuthProvider from "./hooks/useAuth";
import Cart from "../components/cart";

function App() {
  const [waiting, setWaiting] = useState(true);
  const changeWaitingStatus = (waitStatus) => {
    setWaiting(waitStatus);
  };

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/first-store"
              element={<Layout onChangeWaiting={changeWaitingStatus} />}
            >
              <Route
                index
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="All products"
                  />
                }
              />
              <Route
                path="tv"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="TV"
                    link="tv"
                  />
                }
              />
              <Route
                path="audio"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Audio"
                    link="audio"
                  />
                }
              />

              <Route
                path="mobile"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Mobile"
                    link="mobile"
                  />
                }
              />
              <Route
                path="gaming"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Gaming"
                    link="gaming"
                  />
                }
              />
              <Route
                waiting={waiting}
                onChangeWaiting={changeWaitingStatus}
                path=":id"
                element={<ProductPage />}
              />
              <Route
                // waiting={waiting}
                // onChangeWaiting={changeWaitingStatus}
                path="login"
                element={<LoginPage />}
              />
              <Route
                // waiting={waiting}
                // onChangeWaiting={changeWaitingStatus}
                path="registration"
                element={<RegistrationPage />}
              />
              <Route
                // waiting={waiting}
                // onChangeWaiting={changeWaitingStatus}
                path="cart"
                element={<Cart />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
