import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useParams,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions/action";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addDataToCart = (p) => {
    dispatch(addCart(p));
    navigate("/cart")

  };
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(await response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 pd d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="productImage"
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6 pd">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5 p-title">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating{product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4 p-price">${product.price}</h3>
          <p className="lead p-text">{product.description}</p>
          <button
            className="btn btn-outline-dark p-btn"
            onClick={() => addDataToCart(product)}
          >
            Add to Cart
          </button>
          {/* <Link to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </Link> */}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
