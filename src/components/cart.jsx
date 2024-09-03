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
      axios.get(`https://fakestoreapi.in/api/products`).then((res) => {
        const filteredProducts = res.data.products.filter((p) =>
          ids.includes(p.id)
        );
        const sortedCart = user.cart.sort((a, b) => a.id - b.id);

        for (let i = 0; i < filteredProducts.length; i++) {
          filteredProducts[i] = { ...filteredProducts[i], ...sortedCart[i] };
        }
        setProducts(filteredProducts);
      });
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

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
  const deleteProduct = async (id, del) => {
    const newProduct = products.find((p) => p.id === id);
    newProduct.quantity--;
    let newProdArr = [...products];
    if (newProduct.quantity <= 0 || del) {
      newProdArr = newProdArr.filter((p) => p.id !== id);
    } else newProdArr.forEach((p) => (p.id === id ? (p = newProduct) : p));
    setProducts(newProdArr);

    const newData = user.cart.find((p) => p.id === id);
    newData.quantity--;
    let newCartArr = [...user.cart];
    if (newData.quantity <= 0 || del) {
      newCartArr = newCartArr.filter((p) => p.id !== id);
    } else newCartArr.forEach((p) => (p.id === id ? (p = newData) : p));
    const data = { ...user, cart: newCartArr };
    try {
      await updateUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(products.reduce((a, n) => (a += n.price * n.quantity), 0));
  // }, [products]);

  return (
    <>
      {products?.length > 0 ? (
        <div className="container-fluid me-2">
          <h1>Shopping cart</h1>
          <div className="d-flex flex-column flex-sm-row gap-2 ">
            <div className="flex-grow-1">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 shadow-sm "
                  // style={{ minWidth: "75vw" }}
                >
                  <div className="row g-0 d-flex justify-content-md-start align-items-md-start justify-content-center align-items-center ">
                    <div className="col-md-4 d-flex justify-content-center align-items-center ">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start"
                        alt={item.category}
                        style={{ maxHeight: "220px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body ">
                        <Link to={`/first-store/${item.category}/${item.id}`}>
                          <h5
                            className="card-title  "
                            style={{ marginBottom: "10px" }}
                          >
                            {item.title}
                          </h5>
                        </Link>

                        <div
                          style={{ marginTop: "10px" }}
                          className="card-text"
                        >
                          <h4>
                            <span className="badge bg-success">
                              {item.price * item.quantity}$
                            </span>
                          </h4>
                          <div className="d-flex  align-items-center">
                            <h4 className="mt-2 me-3">
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
                            <div
                              onClick={() => deleteProduct(item.id, true)}
                              className="btn btn-secondary"
                            >
                              <i className="bi bi-trash3"></i> Delete
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{ minWidth: "175px" }}
              className="card align-self-stretch align-self-sm-start bg-body-secondary shadow-sm sticky-top"
            >
              <div className="card-body  align-self-center">
                <h5 className="card-title">Order summary</h5>
                <div
                  style={{ maxWidth: "130px" }}
                  className="mb-1 card-text d-flex align-items-center justify-content-between"
                >
                  <span>Price:</span>
                  <span className="text-success">
                    {products.reduce((a, n) => (a += n.price * n.quantity), 0)}$
                  </span>
                </div>
                <div
                  style={{ maxWidth: "130px" }}
                  className="card-text mb-2 d-flex align-items-center justify-content-between"
                >
                  <span>Delivery:</span>
                  <span className="text-primary ">free</span>
                </div>
                <a href="#" className="btn btn-danger">
                  Go to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="position-absolute top-50 start-50 translate-middle">
          Cart is empty
        </h3>
      )}
    </>
  );
};

export default Cart;
