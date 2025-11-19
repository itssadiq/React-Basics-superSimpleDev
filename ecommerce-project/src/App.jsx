import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { Routes, Route } from "react-router";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFound404 } from "./pages/NotFound404";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };
    fetchAppData();
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
