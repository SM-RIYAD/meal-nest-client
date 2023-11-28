import React from "react";
import { Rating } from "@smastrom/react-rating";
import { BiLike } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import useAxiosPublic from "../hooks/useAxiosPublic";
const MealHorizontalCard = ({ meal ,refetch}) => {
const axiosPublic= useAxiosPublic();
const SuccessToast = (successmsg) =>
  toast.success(successmsg, { position: "bottom-center" });

const {user}=useAuth()
const likedemails=meal?.likeEmails
;
let likedEmailscheck;
if(likedemails){
     likedEmailscheck=likedemails.find((email)=>email===user?.email);
}
console.log("like email check:",likedEmailscheck);
const handleLikeButton=()=>{
  if(user?.email){
    if( likedEmailscheck){


     Swal.fire({
         title: "Failed to Like!",
         text: `You have already liked the meal!`,
         icon: "warning",
         confirmButtonText: "ok",
       });
       return;

    }








 ///updating liked email in meal collection
 const mealinfo = {
     likeEmail:user?.email,
   };
   axiosPublic
     .put(`/update_like_email_in_Upcoming_meals/${meal._id}`, mealinfo, {
       headers: {
         "Content-Type": "application/json",
       },
     })
     .then((response) => {
       console.log(response.data);
       if (response.data.modifiedCount > 0) {
         Swal.fire({
           title: "Liked!",
           text: `You have liked the meal!`,
           icon: "success",
           confirmButtonText: "Cool",
         });


 ///updating like count
 axiosPublic.get(`/updatelikecountInUpcomingMeals/${meal._id}`).then((response) => {
   console.log(response.data);
   if ( response.data.modifiedCount > 0) {
     // Swal.fire({
     //   title: "Success!",
     //   text: "Successfully incremented job",
     //   icon: "success",
     //   confirmButtonText: "Cool"
     // });
     SuccessToast("Successfully incremented Like count  !");
     refetch();
   }
 })
 .catch((error) => {
   console.error("Error:", error);
   // Handle errors if any
 });







       } else{

         //   Swal.fire({
         //       title: "Failed to Like!",
         //       text: `You have already liked the meal!`,
         //       icon: "warning",
         //       confirmButtonText: "ok",
         //     });
             

       }
     })
     .catch((error) => {
       console.error("Error:", error);
       // Handle errors if any
     });

 }else{

     Swal.fire({
         title: "Failed to give Like!",
         text: "You have to be logged in",
         icon: "warning",
         confirmButtonText: "Ok"
       });
   
 }

}



  return (
    <div><ToastContainer />
      <div className="card card-side bg-base-100 shadow-xl flex lg:flex-row flex-col ">
        <figure className="lg:w-1/2 h-56 lg:p-0 p-2  ">
          <img className="h-56 object-cover" src={meal.mealImage} alt="Movie" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title">{meal.mealTitle}</h2>
          <Rating style={{ maxWidth: 120 }} value={meal.rating} readOnly />
          <p>{meal.ingredients}</p>
          <div className="card-actions justify-end">
            <button    onClick={handleLikeButton}
            
              className=" btn btn-primary bg-red-500 text-white border-none text-bold text-xl"
            >
              <BiLike />
            </button>
            <p className="text-xl text-red-400">({meal.likes})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealHorizontalCard;
