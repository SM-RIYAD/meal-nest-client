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
  const [searchTerm, setSearchTerm] = useState('');
  const [meals_to_show, setMeals_to_show] = useState([]);
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
      setMeals_to_show(res.data)
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
  const handleSearch=()=>{
    console.log("this is search term",searchTerm);
    if(searchTerm.length<=0){

      refetch();
      return;

    }
    axiosSecure.get(`/api/search/in_servepage/${searchTerm}`).then((res)=>{ console.log( "this are search result",res.data);setMeals_to_show(res.data)});
  }
  return <div>this is servemeal page

<div className="flex lg:flex-row w-full my-5 justify-center flex-col">
                  <input
                    type="text"
                    placeholder="Enter email or name"
                    className="input  mt-5 input-bordered  rounded-none "
                    required

                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                  />
                  <button onClick={handleSearch} className="btn mt-5   rounded-none bg-red-500 border-red-400 border-4  text-white hover:border-none  ">
                    Search
                  </button>
                </div>
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
                {meals_to_show.map((meal) => (
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
