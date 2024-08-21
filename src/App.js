import "./App.css";
import MainHome from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={MainHome} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/products/:id" Component={Product} />
        <Route exact path="/cart" Component={Cart} />
         <Route exact path="/checkout" Component={Checkout} />
      </Routes>
    </>
  );
}

export default App;
