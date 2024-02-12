import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemsList = ({ category = "" }) => {
  //   const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${category}`)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      });
  }, []);

  const searchProduct = (e) => {
    setFilteredItems(
      items.filter((item) => item.title.includes(e.target.value))
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex mb-2">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
          onChange={searchProduct}
        ></input>
        <button className="btn btn-outline-success" type="submit">
          Cart
        </button>
      </div>
      <ul>
        {(filteredItems &&
          filteredItems.map((item) => <li key={item.id}>{item.title}</li>)) ||
          "Loading..."}
      </ul>
    </div>
  );
};

export default ItemsList;
