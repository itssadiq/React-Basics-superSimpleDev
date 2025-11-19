import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import "./CheckoutPage.css";
import axios from "axios";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let res = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(res.data);

      res = await axios.get("/api/payment-summary");
      setPaymentSummary(res.data);
    };

    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <CheckoutHeader cart={cart} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
