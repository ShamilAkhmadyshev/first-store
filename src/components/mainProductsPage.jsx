import React from "react";
import ItemsList from "../components/itemsList";
const MainProductsPage = ({ name, link = "", waiting, onChangeWaiting }) => {
  return (
    <>
      <header className="container-fluid">
        <div>
          <h1>{name}</h1>
        </div>
      </header>
      <ItemsList
        onChangeWaiting={onChangeWaiting}
        waiting={waiting}
        category={link}
      />
    </>
  );
};

export default MainProductsPage;
