import React from "react";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const MealCard = ({ meal }) => {
  AOS.init();
  return (
    <div   data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out" data-aos="zoom-in-up" className="">
      <div className="card card-compact lg:w-96 w-auto bg-base-100 shadow-xl">
        <figure className=" h-56 object-cover lg:w-96 w-auto p-2">
          <img
            className="object-cover  h-56 lg:w-96 w-full"
            src={meal.mealImage}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{meal.mealTitle}</h2>
          {/* <p >Rating: }</p> */}
          <Rating style={{ maxWidth: 120 }} value={meal.rating} readOnly />
          <p className="font-bold">${meal.price}</p>
          <div className="card-actions justify-start">
            <Link to={`mealdetails/${meal._id}`}>
              {" "}
              <button className="btn mt-5 btn-s btn-outline text-red-400  hover:bg-red-500   hover:border-none">
                Meal Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
