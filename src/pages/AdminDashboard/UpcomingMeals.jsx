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
  const axiosPublic = useAxiosPublic();
  const [showmeals, setShowmeals] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [datacount, setDatacount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: count = {}, isPending: count_loading } = useQuery({
    queryKey: ["upcoming_meal_count"],

    queryFn: async () => {
      const res = await axiosPublic.get("/AllUpcomingmealsCount");
      setDatacount(res.data.count);
      return res.data;
    },
  });

  const {
    data: meals = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["upcomingmeal", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/upcomingmeals?page=${currentPage}&size=${itemsPerPage}`
      );
      console.log("upcoming meals", res.data);

      const mealdata = res.data;
      const sortedMeals = mealdata.sort((a, b) => b.likes - a.likes);
      setShowmeals(sortedMeals);
      return res.data;
    },
  });
  console.log("upcoming meals", showmeals);

  const handlePublish = (mealToPublish) => {
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
      adminEmail,
      likeEmails,
    } = mealToPublish;
    console.log("total likes", mealToPublish.likes, mealToPublish);

    if (mealToPublish.likes > 9) {
      axiosSecure
        .post(
          "addmeal",
          {
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
            adminEmail,
            likeEmails,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Your Upcoming meal is published !",
              icon: "success",
              confirmButtonText: "Cool",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if any
        });
    } else {
      console.log("meal to publish", mealToPublish);
      Swal.fire({
        title: "Failed!",
        text: "At least 10 like is needed !",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const numberOfPages = Math.ceil(datacount / itemsPerPage);
console.log("number of pages:", numberOfPages)
  // const pages = []
  // for(let i = 0; i < numberOfPages; i++){
  //     pages.push(i)
  // }
  const pages = [...Array(numberOfPages).keys()];
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
  };
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
                      <button
                        onClick={() => {
                          handlePublish(meal);
                        }}
                        className="btn btn-xs btn-error ms-1 text-white"
                      >
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
          <div className="pagination w-full flex my-5 justify-center">
            {/* <p>Current page: {currentPage}</p> */}
            {/* <button onClick={handlePrevPage}>Prev</button> */}
            {pages.map((page) => (
              <button
                className={`${
                  currentPage === page
                    ? "bg-red-400 text-white"
                    : "bg-gray-300 text-black"
                } btn btn-sm `}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page}
              </button>
            ))}
            {/* <button onClick={handleNextPage}>Next</button> */}
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              name=""
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMeals;
