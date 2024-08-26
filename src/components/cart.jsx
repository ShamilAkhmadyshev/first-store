import React, { useState, useEffect } from "react";
import { useAuth } from "../app/hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
const Cart = () => {
  const { user, updateUser } = useAuth();
  const [products, setProducts] = useState();
  useEffect(() => {
    if (user && user.cart) {
      const ids = user.cart.map((p) => p.id);
      axios.get(`https://fakestoreapi.com/products/`).then((res) => {
        const filteredProducts = res.data.filter((p) => ids.includes(p.id));
        const sortedCart = user.cart.sort((a, b) => a.id - b.id);

        for (let i = 0; i < filteredProducts.length; i++) {
          filteredProducts[i] = { ...filteredProducts[i], ...sortedCart[i] };
        }
        setProducts(filteredProducts);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const addProduct = async (id) => {
    const newProduct = products.find((p) => p.id === id);
    newProduct.quantity++;
    const newProdArr = [...products];
    newProdArr.forEach((p) => (p.id === id ? (p = newProduct) : p));
    const newData = user.cart.find((p) => p.id === id);
    newData.quantity++;
    const newCartArr = [...user.cart];
    newCartArr.forEach((p) => (p.id === id ? (p = newData) : p));
    const data = { ...user, cart: newCartArr };
    try {
      await updateUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    const newProduct = products.find((p) => p.id === id);
    newProduct.quantity--;
    let newProdArr = [...products];
    if (newProduct.quantity > 0) {
      newProdArr.forEach((p) => (p.id === id ? (p = newProduct) : p));
    } else newProdArr = newProdArr.filter((p) => p.id !== id);
    console.log(newProdArr);
    setProducts(newProdArr);

    const newData = user.cart.find((p) => p.id === id);
    newData.quantity--;
    let newCartArr = [...user.cart];
    if (newData.quantity > 0) {
      newCartArr.forEach((p) => (p.id === id ? (p = newData) : p));
    } else newCartArr = newCartArr.filter((p) => p.id !== id);

    const data = { ...user, cart: newCartArr };
    try {
      await updateUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {products?.length > 0 ? (
        <div className="container-fluid">
          {products.map((item) => (
            <div
              //   to={`/${
              //     item.category === "men's clothing"
              //       ? "men"
              //       : item.category === "women's clothing"
              //       ? "women"
              //       : item.category
              //   }/${item.id}`}
              key={item.id}
              className="card m-4 p-3 d-flex justify-content-center align-items-stretch focus-ring active"
              style={{
                maxHeight: "140px",
                maxWidth: "1000px",
                textDecoration: "none",
              }}
            >
              <div className="row g-0 d-flex justify-content-center align-items-center flex-grow-1">
                <div className="col-md-4 img-fluid rounded-start">
                  <img
                    src={item.image}
                    className="rounded-start"
                    alt={item.category}
                    style={{ maxWidth: "100px" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column justify-content-center flex-grow-1">
                    <Link
                      to={`/${
                        item.category === "men's clothing"
                          ? "men"
                          : item.category === "women's clothing"
                          ? "women"
                          : item.category
                      }/${item.id}`}
                    >
                      <h5
                        className="card-title"
                        style={{ marginBottom: "10px" }}
                      >
                        {item.title}
                      </h5>
                    </Link>

                    <div
                      style={{ marginTop: "10px" }}
                      className="d-flex justify-content-between"
                    >
                      {/* <div className="card-text align-self-end">
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
                      </div> */}
                      <h4>
                        <span className="badge bg-success">
                          {item.price * item.quantity}$
                        </span>
                      </h4>
                      <h4>
                        <span
                          onClick={() => deleteProduct(item.id)}
                          className="border btn btn-light me-2"
                        >
                          -
                        </span>
                        <span className="badge bg-primary">
                          {item.quantity}
                        </span>
                        <span
                          onClick={() => addProduct(item.id)}
                          className="border btn btn-light ms-2"
                        >
                          +
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3>Cart is empty</h3>
      )}
    </>
  );
};

export default Cart;
