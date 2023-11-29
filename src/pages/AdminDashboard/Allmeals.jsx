import React from "react";
import useMeals from "../../hooks/useMeals";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Allmeals = () => {
  const [meals, loading, refetch] = useMeals();

//   const axiosPublic = useAxiosPublic();

//   const {data: meals = [], isPending: loading, refetch} = useQuery({
//     queryKey: ['meals'], 
   
//     queryFn: async() =>{
//         const res = await axiosPublic.get('/meals');
//         return res.data;
//     }
// })







  const [showmeals, setShowmeals] = useState(meals);
  () => {
    setShowmeals(meals);
  },
    [meals];
console.log("show meals",showmeals );
console.log("meals", meals );
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
                      <button className="btn btn-xs btn-error ms-1 text-white">
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
        <th></th>
        <th>Job</th> 
    
      </tr>
    </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allmeals;
