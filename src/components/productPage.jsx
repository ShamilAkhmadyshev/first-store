import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./spinner";
import Humanize from "humanize-plus";
import bootstrap from "bootstrap";
const ProductPage = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  // const category = product.category === "jewelery" ? "jewelry" :  product.category.includes(" ") ? `${product.category.splice}`

  //------------------------------------

  const majorityElement = function (nums) {
    for (let i = 0; i < nums.length; i++) {
      const halfLength = nums.length / 2;
      let count = [];
      for (let a = 0; a < nums.length; a++) {
        if (nums[i] === nums[a]) {
          count.push(nums[a]);
        }
      }
      if (count.length > halfLength) {
        return count[0];
      }
    }
  };

  console.log(majorityElement([3, 2, 3]));
  //---------------------------------------------------------
  return (
    <>
      {!product ? (
        <Spinner />
      ) : (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb p-3">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to={`/products/${product.category}`}>
                  {Humanize.capitalize(product.category)}
                </NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.id}
              </li>
            </ol>
          </nav>
          <div className="d-flex justify-content-center">
            <div className="row g-0 ">
              <div className="col-md-4">
                <img
                  // style={{ maxWidth: "5px" }}
                  src={product.image}
                  className="img-fluid object-fit-scale rounded-start p-5"
                  alt="product"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body mt-5">
                  <h2 className="card-title">{product.title}</h2>
                  <p
                    style={{ maxWidth: "800px", textAlign: "justify" }}
                    className="card-text fs-5 mt-4"
                  >
                    {product.description}
                  </p>
                  <div
                    className="d-flex justify-content-between"
                    style={{ maxWidth: "800px" }}
                  >
                    <div>
                      <p className="card-text">
                        {" "}
                        <b>
                          Rate: {product.rating?.rate}{" "}
                          <i className="bi bi-star-fill"></i>
                        </b>
                      </p>
                      <p className="text-body-secondary">
                        <b>Count: {product.rating?.count} pcs</b>
                      </p>
                    </div>

                    <div>
                      <h3>
                        <span className="badge bg-success align-self-center">
                          {product.price}$
                        </span>
                      </h3>
                      <button type="button" class="btn btn-primary">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
