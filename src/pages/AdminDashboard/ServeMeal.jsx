import React, { useState, useEffect } from "react";
import useMeals from "../../hooks/useMeals";
import SharedBanner from "../../shared/SharedComponents/SharedBanner";
import MealCard from "../Home/MealCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ServeMeal = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: requestedmeals = [],
    isLoading,
    isPending: r_meal_loading,
    refetch,
  } = useQuery({
    queryKey: ["r_meals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestedmeals`);

      return res.data;
    },
  });

  const  handleServe= (id)=>{
    const mealinfo={};
    axiosSecure
    .put(`/update_requested_meal_status/${id}`, mealinfo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Delivered!",
          text: `You have delivered the meal!`,
          icon: "success",
          confirmButtonText: "Cool",
        });
  refetch();
  
  ///updating like count
  
  
  
  
  
  
  
      } else{
  
          Swal.fire({
              title: "Already served !",
              text: `You have already Served the meal!`,
              icon: "warning",
              confirmButtonText: "ok",
            });
            
  
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors if any
    });
  
  
  }
  return <div>this is servemeal page


{r_meal_loading? (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Meal Title</th>
                  <th> Requested User Email</th>
                  <th>Requested User Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestedmeals.map((meal) => (
                  <tr key={meal._id}>
                    <th>{meal.mealTitle}</th>
                    <td>{meal.requestedUsersEmail}</td>
                    <td>{meal.requestedUsersName}</td>
                    <td>{meal.mealStatus}</td>
                    
                    <td>
                  

                      <button
                        onClick={()=>{  handleServe(meal._id)}
                        
                      }
                        className="btn ms-1 btn-xs btn-error text-white"
                      >
                        {" "}
                        Serve{" "}
                      </button>
                  
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Littel, Schaden and Vandervort</td>
                  <td>Canada</td>
                  <td>
                    <button className="btn btn-xs ms-1 btn-error text-white">
                      {" "}
                      Update{" "}
                    </button>
                    <button className="btn ms-1 btn-xs btn-error text-white">
                      {" "}
                      Delete{" "}
                    </button>
                    <button className="btn btn-xs btn-error ms-1 text-white">
                      {" "}
                      view{" "}
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      )}







  </div>;
};

export default ServeMeal;
