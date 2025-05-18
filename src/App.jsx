import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ConfirmationPage from "./Pages/ConfirmationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
