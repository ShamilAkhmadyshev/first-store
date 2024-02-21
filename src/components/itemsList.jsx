import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "./spinner";

const ItemsList = ({ category = "", waiting, onChangeWaiting }) => {
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState();
  const [originalList, setOriginalList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sortby") || "Sort by";

  const setSortByPriceIncrease = () => {
    setSearchParams({ sortby: "price_increase" });
  };

  const setSortByPriceDecrease = () => {
    setSearchParams({ sortby: "price_decrease" });
  };
  const setSortByRateIncrease = () => {
    setSearchParams({ sortby: "rate_increase" });
  };
  const setSortByRateDecrease = () => {
    setSearchParams({ sortby: "rate_decrease" });
  };

  const setSortByDefault = () => {
    searchParams.delete("sortby");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    switch (sortByQuery) {
      case "price_increase":
        if (filteredItems) {
          setFilteredItems(
            [...filteredItems].sort((a, b) => a.price - b.price)
          );
        }
        break;
      case "price_decrease":
        if (filteredItems) {
          setFilteredItems(
            [...filteredItems].sort((a, b) => b.price - a.price)
          );
        }
        break;
      case "rate_increase":
        if (filteredItems) {
          setFilteredItems(
            [...filteredItems].sort((a, b) => a.rating.rate - b.rating.rate)
          );
        }
        break;
      case "rate_decrease":
        if (filteredItems) {
          setFilteredItems(
            [...filteredItems].sort((a, b) => b.rating.rate - a.rating.rate)
          );
        }
        break;
      default:
        setFilteredItems(originalList);
    }
  }, [sortByQuery, filteredItems, originalList]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${category}`)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
        setOriginalList(response.data);
      })
      .then(() => {
        onChangeWaiting(false);
        const searchInput = document.querySelector("[name='search']");
        if (searchInput) {
          searchInput.value = "";
        }
      });
  }, [category, onChangeWaiting]);

  const searchProduct = (e) => {
    console.log(e.target.value);
    setFilteredItems(
      items.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      {!filteredItems || waiting ? (
        <Spinner />
      ) : (
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

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortByQuery === "price_increase"
                  ? "Price increase"
                  : sortByQuery === "price_decrease"
                  ? "Price decrease"
                  : sortByQuery === "rate_increase"
                  ? "Rate increase"
                  : sortByQuery === "rate_decrease"
                  ? "Rate decrease"
                  : "Sort by"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={setSortByPriceIncrease}
                  >
                    Increase price
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={setSortByPriceDecrease}
                  >
                    Decrease price
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={setSortByRateIncrease}
                  >
                    Increase rate
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={setSortByRateDecrease}
                  >
                    Decrease rate
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={setSortByDefault}>
                    Default
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {filteredItems.length >= 1 ? (
            <div
              className={
                filteredItems.length > 1
                  ? "d-flex flex-wrap justify-content-center"
                  : "d-flex flex-wrap justify-content-start"
              }
            >
              {filteredItems.map((item) => (
                <Link
                  to={`/products/${item.id}`}
                  key={item.id}
                  className="card m-3 p-3 d-flex justify-content-center align-items-stretch focus-ring active"
                  style={{ maxWidth: "540px", textDecoration: "none" }}
                >
                  <div className="row g-0 d-flex justify-content-center align-items-center flex-grow-1">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start"
                        alt={item.category}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex flex-column justify-content-center flex-grow-1">
                        <h5
                          className="card-title"
                          style={{ marginBottom: "10px" }}
                        >
                          {item.title}
                        </h5>

                        {/* <button
                          onClick={(e) => e.preventDefault()}
                          className="accordion d-flex justify-content-between"
                          data-bs-toggle="collapse"
                          href={`#multiCollapseExample${filteredItems.indexOf(
                            item
                          )}`}
                          aria-expanded="true"
                          aria-controls={`multiCollapseExample${filteredItems.indexOf(
                            item
                          )}`}
                        >
                          <span>Description</span>
                          <i className="bi bi-chevron-down"></i>
                        </button>
                        <div
                          className="multi-collapse collapse"
                          id={`multiCollapseExample${filteredItems.indexOf(
                            item
                          )}`}
                        >
                          <div className="card card-body">
                            {item.description}
                          </div>
                        </div> */}

                        <div
                          style={{ marginTop: "10px" }}
                          className="d-flex justify-content-between"
                        >
                          <div className="card-text align-self-end">
                            <div className="text-body-secondary">
                              <b>
                                {" "}
                                Rate: {item.rating?.rate}{" "}
                                <i className="bi bi-star-fill"></i>
                              </b>
                            </div>
                            <div className="text-body-secondary">
                              <b>Count: {item.rating?.count} pcs</b>
                            </div>
                          </div>
                          <h4>
                            <span className="badge bg-success">
                              {item.price}$
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="alert alert-dark " role="alert">
              Nothing's founded
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemsList;
