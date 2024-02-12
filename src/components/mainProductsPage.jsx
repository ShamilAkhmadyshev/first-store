import React from "react";
import ItemsList from "../components/itemsList";
const MainProductsPage = ({ name, link = "" }) => {
  return (
    <>
      <header className="container-fluid">
        <div className="">
          <h1>Electronics</h1>
        </div>
      </header>
      <ItemsList category="category/electronics" />
    </>
  );
};

export default ElectronicsPage;
