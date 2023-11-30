
import React from "react";
import { Rating } from "@smastrom/react-rating";
import { BiLike } from "react-icons/bi";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const MealsHorizontalCard = ({meal}) => {
    const navigate= useNavigate();
    const handleView=(id)=>{
      
        navigate(`/mealdetails/${id}`)



    }
    return (
        <div>
             <div className="card lg:h-56 card-side bg-base-100 shadow-xl flex lg:flex-row flex-col ">
        <figure className="lg:w-1/2 h-56 lg:p-0 p-2  ">
          <img className="h-56 object-cover" src={meal.mealImage} alt="Movie" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title">{meal.mealTitle}</h2>
          <Rating style={{ maxWidth: 120 }} value={meal.rating} readOnly />
          <p>{meal.price} $</p>
          <div className="card-actions justify-start">
          <button onClick={()=>{

handleView(meal._id)

          } 
       } className="btn mt-5 btn-s  text-white bg-red-500   hover:border-none">Details</button>
           
          </div>
        </div>
      </div>
        </div>
    );
};

export default MealsHorizontalCard;