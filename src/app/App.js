import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout";
import HomePage from "../pages/home";
import MenPage from "../pages/men";
import WomenPage from "../pages/women";
import JewelryPage from "../pages/jewelry";
import ElectronicsPage from "../pages/electronics";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            <Route path="/electronics" element={<ElectronicsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
