import React from "react";
import Products from './Products';

const MainHome = () => {
  return (
    <div className="hero">
      <div className="card text-bg-dark border-0">
        <img
          src="/assets/imgs/bg.jpg"
          className="card-img"
          alt="Background"
          height="550px"
        />
        <div className="card-img-overlay d-flex flex-coulmn justify-content-center align-items-center">
          <div className="container">
            <h5 className="card-title display-4 fw-bolder mb-0 font-size1">
              NEW SEASON ARRIVALS
            </h5>
            <p className="card-text fs-2 font-size2">CHECK OUT ALL UPDATES HERE</p>
          </div>
        </div>
      </div>
      <Products/>
    </div>
  );
};

export default MainHome;
