import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout";
import MainProductsPage from "../components/mainProductsPage";
import ProductPage from "../components/productPage";

function App() {
  const [waiting, setWaiting] = useState(true);
  const changeWaitingStatus = (waitStatus) => {
    setWaiting(waitStatus);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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
              path="/men"
              element={
                <MainProductsPage
                  waiting={waiting}
                  onChangeWaiting={changeWaitingStatus}
                  name="Men's clothing"
                  link="category/men's%20clothing"
                />
              }
            />
            <Route
              path="/women"
              element={
                <MainProductsPage
                  waiting={waiting}
                  onChangeWaiting={changeWaitingStatus}
                  name="Women's clothing"
                  link="category/women's%20clothing"
                />
              }
            />
            <Route
              path="/jewelry"
              element={
                <MainProductsPage
                  waiting={waiting}
                  onChangeWaiting={changeWaitingStatus}
                  name="Jewelry"
                  link="category/jewelery"
                />
              }
            />
            <Route
              path="/electronics"
              element={
                <MainProductsPage
                  waiting={waiting}
                  onChangeWaiting={changeWaitingStatus}
                  name="Electronics"
                  link="category/electronics"
                />
              }
            />
            <Route
              waiting={waiting}
              onChangeWaiting={changeWaitingStatus}
              path="/products/:id"
              element={<ProductPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
