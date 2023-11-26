import React from "react";
import { useParams } from "react-router-dom";

import SharedBanner from "../../shared/SharedComponents/SharedBanner";
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "./Checkoutform";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAYKEY);
const CheckoutPage = () => {
  const { memberpackage } = useParams();

  const plan_packages = [
    { plan_name: "SILVER", plan_Price: 11.99 },
    { plan_name: "GOLD", plan_Price: 15.99 },
    { plan_name: "PLATINUM", plan_Price: 20.99 },
  ];

  const slected_package = plan_packages.find(
    (p_package) => p_package.plan_name === memberpackage
  );

  const payment_price = slected_package.plan_Price;

  console.log("selected price: ", payment_price);

  return (
    <div>
      {" "}
      <SharedBanner title={"CHECK OUT PAGE"}></SharedBanner>
      <div className="mx-auto max-w-6xl">
        this is checkout page. {memberpackage}
        <div>
          <Elements stripe={stripePromise}>
            <Checkoutform payment_price={payment_price} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
