import React from "react";
import useMeals from "../../hooks/useMeals";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Allmeals = () => {
  // const [meals, loading, refetch] = useMeals();
  const [datacount, setDatacount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
    const axiosPublic = useAxiosPublic();
    const navigate =useNavigate();

    const handleViewMeals=(id)=>{


 
      navigate(`/mealdetails/${id}`)
    }
    const {data: meals = [], isPending: loading, refetch} = useQuery({
      queryKey: ['meals',currentPage,itemsPerPage],

      queryFn: async() =>{
          const res = await axiosPublic.get(`/meals?page=${currentPage}&size=${itemsPerPage}`);
          return res.data;
      }
  })


      const {data: count = {}, isPending: count_loading, } = useQuery({
      queryKey: ['meal_count'],

      queryFn: async() =>{
          const res = await axiosPublic.get('/AllmealsCount');
          setDatacount(res.data.count)
          return res.data;
      }
  })

  const [showmeals, setShowmeals] = useState(meals);
  // () => {
  //   setShowmeals(meals);
  // },

  // [meals];
console.log("data count: ",count?.count)



  const numberOfPages = Math.ceil(datacount / itemsPerPage);

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

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log("show meals", showmeals);
  console.log("meals", meals);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/deletemeal/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Job has been deleted.", "success");
              // const remaining = jobs.filter(job => job._id !== id);
              // setJobs(remaining);

              refetch();
            }
          });
      }
    });
  };
  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
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
              {meals.map((meal) => (
                <tr key={meal._id}>
                  <th>{meal.mealTitle}</th>
                  <td>{meal.likes}</td>
                  <td>{meal.reviews}</td>
                  <td>{meal.adminName}</td>
                  <td>{meal.adminEmail}</td>
                  <td>
                    <Link to={`/updatemeal/${meal._id}`}>
                      {" "}
                      <button className="btn btn-xs ms-1 btn-error text-white">
                        {" "}
                        Update{" "}
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        handleDelete(meal._id);
                      }}
                      className="btn ms-1 btn-xs btn-error text-white"
                    >
                      {" "}
                      Delete{" "}
                    </button>
                    <button onClick={()=>{
handleViewMeals(meal._id)


                    }} className="btn btn-xs btn-success ms-1 text-white">
                      {" "}
                      view{" "}
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
            <tfoot>
              <tr>
                <th></th> <th></th>
                <th>
                 {" "}
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
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

export default Allmeals;
