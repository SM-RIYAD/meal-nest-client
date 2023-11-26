import React from "react";

const Membership = () => {
  const packages = ["SILVER", "GOLD", "PLATINUM"];
  return (
    <div className="mx-auto max-w-6xl">
   <p className="text-2xl text-center  my-10 text-red-400">GET MEMBERSHIP</p>
      <div className="grid gap-5  lg:grid-cols-3 grid-cols-1">
        <div className="card w-94 bg-gradient-to-r from-pink-500 to-yellow-500 border bg-opacity-70  border-zinc-200 text-primary-content">
          <div className="card-body text-white">
            <h2 className="card-title ">SILVER</h2>
            <p className="text-4xl"> $11.99</p>
            <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card w-94 bg-gradient-to-r from-pink-500 to-yellow-500 border bg-opacity-70   ">
          <div className="card-body text-white">
            <h2 className="card-title">GOLD</h2>
            <p className="text-4xl"> $15.99</p>
            <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card w-94 bg-gradient-to-r from-pink-500 to-yellow-500 border bg-opacity-70 text-primary-content">
          <div className="card-body text-white">
            <h2 className="card-title">PLUTINUM</h2>
            <p className="text-4xl"> $20.99</p>
            <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Membership;
