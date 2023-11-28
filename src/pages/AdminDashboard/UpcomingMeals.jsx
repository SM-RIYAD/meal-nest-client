
import React from "react";
import useMeals from "../../hooks/useMeals";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
const UpcomingMeals = () => {
    const [showmeals, setShowmeals] = useState([]);
    const axiosSecure= useAxiosSecure();
    const {data: meals = [], isPending: loading, refetch} = useQuery({
        queryKey: ['upcomingmeal'], 
        queryFn: async() =>{
            const res = await axios.get('http://localhost:5000/upcomingmeals');
            console.log("upcoming meals",res.data)

            const mealdata= res.data;
            const sortedMeals = mealdata.sort((a, b) => b.likes - a.likes);
            setShowmeals(sortedMeals);
            return res.data;
        }
    })
console.log("upcoming meals",showmeals)
    return (
        <div>
            <p>this is upcomingsdd meals page</p>
            {loading ? (
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
                  <th>Likes Count</th>
                  <th>Reviews Count </th>
                  <th>Distributor Name</th>
                  <th>Distributor Emai</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {showmeals.map((meal) => (
                  <tr key={meal._id}>
                    <th>{meal.mealTitle}</th>
                    <td>{meal.likes}</td>
                    <td>{meal.reviews}</td>
                    <td>{meal.adminName}</td>
                    <td>{meal.adminEmail}</td>
                    <td>
                 

                   
                      <button className="btn btn-xs btn-error ms-1 text-white">
                        {" "}
                        Publish{" "}
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
        </div>
    );
};

export default UpcomingMeals;