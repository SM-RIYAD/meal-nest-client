import React from "react";

const CheckoutCard = ({ plan }) => {
  return (
    <div>
      <div className="card w-full bg-transparent text-primary-content">
        <div className="card-body text-black">
          <h2 className="card-title">{plan.name}</h2>
          <p></p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
