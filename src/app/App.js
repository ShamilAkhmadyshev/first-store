import React, { useState } from "react";
import "bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
                path="/first-store/tv"
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
                path="/first-store/audio"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Audio"
                    link="audio"
                  />
                }
              />
              {/* <Route
                path="/first-store/laptop"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Laptop"
                    link="laptop"
                  />
                }
              /> */}
              <Route
                path="/first-store/mobile"
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
                path="/first-store/gaming"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Gaming"
                    link="gaming"
                  />
                }
              />
              {/* <Route
                path="/first-store/appliances"
                element={
                  <MainProductsPage
                    waiting={waiting}
                    onChangeWaiting={changeWaitingStatus}
                    name="Appliances"
                    link="appliances"
                  />
                }
              /> */}
              <Route
                waiting={waiting}
                onChangeWaiting={changeWaitingStatus}
                path="/first-store/:category/:id"
                element={<ProductPage />}
              />
              <Route
                // waiting={waiting}
                // onChangeWaiting={changeWaitingStatus}
                path="/first-store/login"
                element={<LoginPage />}
              />
              <Route
                // waiting={waiting}
                // onChangeWaiting={changeWaitingStatus}
                path="/first-store/registration"
                element={<RegistrationPage />}
              />
              <Route
                // waiting={waiting}
                // onChangeWaiting={changeWaitingStatus}
                path="/first-store/cart"
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
