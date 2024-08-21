import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";


const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(await response.data);
        setFilter(await response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center pb-5 mb-2 flex-wrap mbottom">
          <button
            className="btn btn-outline-dark me-2 filter-font mb-2"
            onClick={() => {
              setFilter(data);
            }}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2 filter-font mb-2"
            onClick={() => {
              filterProduct("men's clothing");
            }}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2 filter-font mb-2"
            onClick={() => {
              filterProduct("women's clothing");
            }}
          >
            Womens's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2 filter-font mb-2"
            onClick={() => {
              filterProduct("jewelery");
            }}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2 filter-font mb-2"
            onClick={() => {
              filterProduct("electronics");
            }}
          >
            Electronics
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4 d-flex justify-content-center align-items-center" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 11)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <Link to={`/products/${product.id}`} className="btn btn-outline-dark buy">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-4 py-4">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="display-6 fw-bolder text-center font-size2">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
