import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import SharedBanner from "../../shared/SharedComponents/SharedBanner";
import { Rating } from "@smastrom/react-rating";
import { BiLike } from "react-icons/bi";
import Reviews from "./Reviews";
import { useState } from "react";
import ReviewCards from "./ReviewCards";
import useAuth from "../../hooks/useAuth";
import { hashKey, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useReview from "../../hooks/useReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCheckUserPackage from "../../hooks/useCheckUserPackage";


const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
//   const meal = useLoaderData();
const {id}=useParams();
const axiosPublic=useAxiosPublic();
const  [dontHavePackage, dontHavePackageLoading]=useCheckUserPackage();


  const { data: meal={}, isPending: isMealLoading ,refetch} = useQuery({
    queryKey: ["meal"],

    queryFn: async () => {
        console.log('asking or checking is admin', user)
        const res = await axiosSecure.get(`https://meal-nest-server-orpin.vercel.app/specificmeal/${id}`);
        console.log( "meal details",res.data);
        return res.data;
    }
})

const {
    
    mealTitle,
    mealType,
    mealImage,
    ingredients,
    description,
    price,
    rating,
    time,

    likes,
    reviews,
    adminName,
    adminEmail, likeEmails
  } = meal;
const likedemails=meal?.likeEmails
;
let likedEmailscheck;
if(likedemails){
     likedEmailscheck=likedemails.find((email)=>email===user?.email);
}
console.log("like email check:",likedEmailscheck);
  const SuccessToast = (successmsg) =>
  toast.success(successmsg, { position: "bottom-center" });

  const handleLikeButton = () => {
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
      axiosSecure
        .put(`/update_like_email/${meal._id}`, mealinfo, {
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
    axiosSecure.get(`/updatelikecount/${meal._id}`).then((response) => {
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
  };

  const handleRequestMeal=()=>{

      if(dontHavePackage){

        Swal.fire({
            title: "Can't Request !",
            text: "You have to buy a package first! ",
            icon: "warning",
            confirmButtonText: "Ok"
          });
          return;
      }


    if(user?.email){

const mealinfo={
    mealTitle,
    mealType,
    mealImage,
    ingredients,
    description,
    price,
    rating,
    time,

    likes,
    reviews,
    adminName,
    adminEmail, likeEmails

    ,mealStatus:"pending",

    requestedUsersEmail:user?.email,
    requestedUsersName:user?.displayName


}

axiosPublic.post("/addrequestedmeal",mealinfo, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    console.log(response.data);
    if (response.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Meal requested Successfully",
        icon: "success",
        confirmButtonText: "Cool"
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    // Handle errors if any
  });



console.log("user")


    }

    else{

        Swal.fire({
            title: "Failed !",
            text: "You have to be logged in",
            icon: "warning",
            confirmButtonText: "Ok"
          });
        return;
    }



  }
  console.log("this is meal in details", meal);
  return (
    <div>
      <SharedBanner title={meal?.mealTitle} /> <ToastContainer />
      <div className="flex gap-5 mt-10 lg:flex-row flex-col mx-auto max-w-6xl">
        <div className="lg:w-1/2 h-[400px]">
          <img className=" h-full  object-cover" src={meal.mealImage} alt="" />
        </div>
        <div className="lg:w-1/2 space-y-3">
          <p className="text-2xl font-bold">{meal.mealTitle}</p>
          <p className="text-base text-gray-400">
            <i>
              {" "}
              by {meal.adminName} at {meal.time}{" "}
            </i>{" "}
          </p>
          <Rating style={{ maxWidth: 120 }} value={meal.rating} readOnly />
          <p>{meal.description}</p>
          <div className="flex items-center">
            {/* <p className='font-bold text-xl text-gray-300 pe-2'>Ingridiants:</p> */}
          

            <p className="text-gray-400 font-bold "> <i>Ingredients: {meal.ingredients}</i> </p>
          </div>
          <div className="flex gap-5">
            <button onClick={handleRequestMeal} className="btn btn-primary bg-red-500 text-white border-none ">
              Request meal
            </button>
            <button
              onClick={handleLikeButton}
              className=" btn btn-primary bg-red-500 text-white border-none text-bold text-xl"
            >
              <BiLike />
            </button>{" "}
            <p className="text-4xl text-red-400">({meal.likes})</p>
          </div>
        </div>
      </div>
      <Reviews meal={meal}></Reviews>
    </div>
  );
};

export default MealDetails;
