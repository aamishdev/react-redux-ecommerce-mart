import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart, delCart, delFromCart } from "../redux/actions/action";

const Cart = () => {
  const getCart = useSelector((state) => state.cartReducer.carts);
  const [totalPrice, setTotalprice] = useState(0);
  const roundedValue = Number(totalPrice.toFixed(2));
  const dispatch = useDispatch();

  const addDataToCart = (p) => {
    dispatch(addCart(p));
  };

  const delData = (pId) => {
    dispatch(delCart(pId));
  };
  const delAllData = (pId) => {
    dispatch(delFromCart(pId));
  };

  const total = () => {
    let price = getCart.reduce((acc, p) => {
      return acc + p.price * p.qty;
    }, 0);
    setTotalprice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  const EmptyCart = () => {
    return (
      <>
        <div className="display-6 text-center">
          <img
            src="/assets/imgs/cart.gif"
            alt=""
            className="emptycart_img"
            style={{ width: "4rem", padding: 10 }}
          />
          <p>Your Cart is Empty!!!</p>
          <Link className="btn btn-outline-dark" to="/products">
            Go to Products
          </Link>
        </div>
      </>
    );
  };

  const ShowCart = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-4 cart-headings">
            Shopping Cart
            <i
              className="fa fa-shopping-cart me-1 pt-1 ms-2 cart-icon"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </h4>
          <h4 className="mb-4 cart-headings">Total: ${roundedValue}</h4>
        </div>

        {getCart.map((product) => (
          <div key={product.id} className="row justify-content-center d-flex align-items-center p-margins">
            <div className="col-md-8  d-flex justify-content-center">
              <div className="detailsCard d-flex justify-content-around align-items-center shadow rounded">
                <div className="col-md-6 ">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-image mb-4"
                    height="200px"
                    width="200px"
                  />
                </div>
                <div className="col-md-6">
                  <p>
                    <strong className="me-2">Product Name: </strong>
                    {product.title.substring(0, 24)}...
                  </p>
                  <div className="d-flex">
                    <p>
                      <strong className="me-2">Rating: </strong>
                      {product.rating && product.rating.rate}{" "}
                      <i className="fa fa-star"></i>
                    </p>
                    <p className="mx-5">
                      <strong>Category: </strong>
                      {product.category}
                    </p>
                  </div>
                  <p>
                    <strong>Price: </strong> { product.qty===1 ? `$${product.price}` : `${product.qty} x $${product.price} = $${product.qty * product.price}`}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <p className="m-0">
                        <strong>Quantity: </strong>
                      </p>
                      <i
                        class="fa fa-minus mx-2 btn btn-sm btn-outline-dark"
                        onClick={() => delData(product.id)}
                      ></i>
                      {product.qty}
                      <i
                        class="fa  fa-plus mx-2 btn btn-sm btn-outline-dark"
                        onClick={() => addDataToCart(product)}
                      ></i>
                    </div>
                    <i
                      onClick={() => delAllData(product.id)}
                      className="fa fa-trash trash"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="my-4 d-flex justify-content-center align-items-center">
          <Link to="/products" className="btn btn-outline-dark me-2">Continue Shopping</Link>
          <Link to="/checkout" className="btn btn-dark me-2">Checkout</Link>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-2">
        <div className="row py-4">
          {getCart.length ? <ShowCart /> : <EmptyCart />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
