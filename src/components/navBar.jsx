import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../app/hooks/useAuth";
import NavProfile from "../app/ui/navProfile";
// import bootstrap from "bootstrap";
const NavBar = ({ onChangeWaiting }) => {
  const { user, productQuantity } = useAuth();
  // const [productQuantity, setProductQuantity] = useState();
  const html = document.documentElement;
  const [colorTheme, setColorTheme] = useState(
    html.getAttribute("data-bs-theme")
  );
  const setWaitingTrue = () => {
    onChangeWaiting(true);
  };
  const sun = <i className="bi bi-brightness-high-fill"></i>;
  const moon = <i className="bi bi-moon-fill"></i>;

  // useEffect(() => {
  //   if (user && user.cart) {
  //     let quan = 0;
  //     user.cart.forEach((p) => (quan += p.quantity));
  //     setProductQuantity(quan);
  //   }
  // }, [user]);

  const changeColorTheme = () => {
    ("data-bs-theme");
    if (colorTheme === "light") {
      html.setAttribute("data-bs-theme", "dark");
      setColorTheme("dark");
    } else {
      html.setAttribute("data-bs-theme", "light");
      setColorTheme("light");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink
          onClick={setWaitingTrue}
          className="navbar-brand"
          to="/first-store"
        >
          Fake Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <NavLink
                onClick={setWaitingTrue}
                className="nav-link"
                to=""
              >
                Home
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                onClick={setWaitingTrue}
                className="nav-link"
                to="/first-store/tv"
              >
                TV
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={setWaitingTrue}
                className="nav-link"
                to="/first-store/audio"
              >
                Audio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                onClick={setWaitingTrue}
                to="/first-store/mobile"
                className="nav-link"
              >
                Mobile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={setWaitingTrue}
                to="/first-store/gaming"
                className="nav-link"
              >
                Gaming
              </NavLink>
            </li>
          </ul>

          {user ? (
            <>
              <NavLink
                className="nav-link me-3 mb-2 mb-lg-0"
                onClick={setWaitingTrue}
                to="/first-store/cart"
              >
                {productQuantity ? (
                  <>
                    <i className="bi bi-cart-fill"></i> {productQuantity}
                  </>
                ) : (
                  <i className="bi bi-cart"></i>
                )}
              </NavLink>
              <NavProfile />
            </>
          ) : (
            <NavLink
              onClick={setWaitingTrue}
              className="nav-link me-3 mb-2 mb-lg-0"
              to="/first-store/login"
            >
              Log in/Sign up
            </NavLink>
          )}
          <div className="btn" onClick={changeColorTheme}>
            {colorTheme === "light" ? moon : sun}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
