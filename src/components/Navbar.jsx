import { Badge } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { delFromCart } from "../redux/actions/action";

const Navbar = () => {

  const getData = useSelector((state) => state.cartReducer.carts);
  const [totalPrice, setTotalprice] = useState(0);
  const dispatch = useDispatch();

  const delData = (pId) => {
    dispatch(delFromCart(pId));
  };

  const total = () => {
    let price = getData.reduce((acc, p) => {
      return acc + p.price * p.qty;
    }, 0);
    setTotalprice(price);
  };

  useEffect(() => {
    total();
  }, [getData]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg py-3 shadow-sm bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            AM Collection
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link " to="products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link " to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link " to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              <Link to="/login" className="btn btn-outline-dark ">
                <i className="fa fa-sign-in me-1"></i> Login
              </Link>
              <Link to="/register" className="btn btn-outline-dark ms-2">
                <i className="fa fa-user-plus me-1"></i> Register
              </Link>

              <Badge
                badgeContent={getData.length}
                color="success"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <i
                  className="fa fa-shopping-cart me-1 pt-1 ms-2"
                  style={{ fontSize: 25, cursor: "pointer" }}
                ></i>
              </Badge>
            </div>
          </div>
        </div>
      </nav>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {getData.length ? (
          <div
            className="card_details d-flex justify-content-center align-items-center"
            style={{ width: "20rem", padding: 8 }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                {getData.map((p) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <NavLink to="/cart">
                            <img
                              src={p.image}
                              alt={p.title}
                              style={{ width: "4rem", height: "4rem" }}
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p className="my-1">{p.title.substring(0, 14)}...</p>
                          <p className="my-1">
                            Price: <b>${p.price}</b>
                          </p>
                          <p className="my-1">Quantity: <strong>{p.qty}</strong></p>
                        </td>
                        <td
                          className="mt-5"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          <i
                            onClick={() => delData(p.id)}
                            className="fa fa-trash largetrash"
                          ></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
                <p className="text-center">Total: <strong>${totalPrice}</strong></p>
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="card_details d-flex justify-content-center align-items-center"
            style={{ width: "20rem" }}
          >
            <i
              className="fa fa-close smallclose"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 20,
                cursor: "pointer",
              }}
            ></i>
            <p className="fw-bold" style={{ fontSize: 18, margin: 0 }}>
              Your carts is empty
            </p>
            <img
              src="/assets/imgs/cart.gif"
              alt=""
              className="emptycart_img"
              style={{ width: "4rem", padding: 10 }}
            />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default Navbar;
