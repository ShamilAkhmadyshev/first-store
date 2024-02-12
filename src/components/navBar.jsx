import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import bootstrap from "bootstrap";
const NavBar = () => {
  const html = document.documentElement;
  const [colorTheme, setColorTheme] = useState(
    html.getAttribute("data-bs-theme")
  );

  const sun = <i className="bi bi-brightness-high-fill"></i>;
  const moon = <i className="bi bi-moon-fill"></i>;

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
        <NavLink className="navbar-brand" to="/">
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/men">
                Men's clothing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/women">
                Women's clothing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jewelry">
                Jewelry
              </NavLink>
            </li>
            {/* <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/" className="dropdown-item">
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Another action
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Something else here
                  </NavLink>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <NavLink to="/electronics" className="nav-link">
                Electronics
              </NavLink>
            </li>
          </ul>

          {/* <form className="d-flex me-4" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}

          <NavLink className="nav-link me-3 mb-2 mb-lg-0" to="/login">
            Sign In/Sign Up
          </NavLink>
          <div className="btn" onClick={changeColorTheme}>
            {colorTheme === "light" ? moon : sun}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
