import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "Api/url";

toast.configure();

export default function About() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 10.67,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      url + "/api/payments/stripe-checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
        <StripeCheckout
            stripeKey="pk_test_51J9MUoGai0WbKbDB9TIdwrKumDxDlQeDwVVSg3WtCUWkrt2ucF8fCADBmGIntbsYKxGBeG3l0ZmIe9IGk7AsNz0y00ZnGVXI5o"
            token={handleToken}
            amount={product.price * 100}
            name="Tesla Roadster"
        />
    </div>
  );
}

