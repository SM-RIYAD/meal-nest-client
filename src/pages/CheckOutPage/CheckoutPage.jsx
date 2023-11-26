import React from "react";
import { useParams } from "react-router-dom";

import SharedBanner from "../../shared/SharedComponents/SharedBanner";
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "./Checkoutform";
import CheckoutCard from "./CheckoutCard";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAYKEY);
const CheckoutPage = () => {
  const { memberpackage } = useParams();
  const mealPlans = [
    {
      name: 'SILVER',
      description: 'Basic meal package',
      price: 50,
      mealsPerDay: 2,
      snackIncluded: false,
      specialDietOptions: ['Vegetarian'],
      advanceBookingDays: 1,
      support: 'Email support',
      img:"https://png.pngtree.com/png-clipart/20230428/original/pngtree-silver-tier-membership-png-image_9118213.png"
    },
    {
      name: 'GOLD',
      description: 'Enhanced meal package',
      price: 75,
      mealsPerDay: 3,
      snackIncluded: true,
      specialDietOptions: ['Vegetarian', 'Gluten-free'],
      advanceBookingDays: 3,
      support: 'Email and Phone support',
      img:"https://www.onlygfx.com/wp-content/uploads/2022/04/blank-gold-badge-label-2.png"
    },
    {
      name: 'PLATINUM',
      description: 'Premium meal package',
      price: 100,
      mealsPerDay: 4,
      snackIncluded: true,
      specialDietOptions: ['Vegetarian', 'Gluten-free', 'Vegan'],
      advanceBookingDays: 7,
      support: '24/7 Email, Phone, and Chat support',
      additionalPerks: ['Priority service', 'Exclusive events'],
      img:""
    },
  ];
  
  
  // Example usage:
 
  const plan_packages = [
    { plan_name: "SILVER", plan_Price: 11.99 },
    { plan_name: "GOLD", plan_Price: 15.99 },
    { plan_name: "PLATINUM", plan_Price: 20.99 },
  ];

  const slected_package = plan_packages.find(
    (p_package) => p_package.plan_name === memberpackage
  );

  const payment_price = slected_package.plan_Price;
  const payment_badge = slected_package.plan_name;
  const selectedPlan = mealPlans.find(
    (p_package) => p_package.name === memberpackage
  );
  console.log("selected pLAN: ", selectedPlan);

  return (
    <div>
      {" "}
      <SharedBanner title={`Purchase ${memberpackage} Package`}></SharedBanner>
      <div className="mx-auto max-w-6xl">
    
        <div>
          <Elements stripe={stripePromise}>
            {/* <CheckoutCard plan={selectedPlan}/> */}
            <Checkoutform plan={selectedPlan} payment_badge={payment_badge} payment_price={payment_price} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
