
import React ,{useState, useEffect} from 'react';
import useMeals from '../../hooks/useMeals';
import SharedBanner from "../../shared/SharedComponents/SharedBanner"
import MealCard from '../Home/MealCard';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const RequestedMeals = () => {
  const [datacount, setDatacount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [meals_to_show, set_meals_to_show] = useState([]);
  const {data: count = {}, isPending: count_loading, } = useQuery({
    queryKey: ['all_review_count'],

    queryFn: async() =>{
        const res = await axiosSecure.get(`/requestedMealsCount?email=${user?.email}`);
        setDatacount(res.data.count)
        console.log("data count review",res.data.count )
        return res.data;
    }
})







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
            fetch(`https://meal-nest-server-orpin.vercel.app/deleteRequestedMeal/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                  Swal.fire("Deleted!", "Meal has been deleted.", "success");
                  // const remaining = jobs.filter(job => job._id !== id);
                  // setJobs(remaining);
    
                  refetch();
                }
              });
          }
        });
      };

      const comparemeals = (user1, user2) => {
        // Sort by mealStatus (pending comes first)
        return user1.mealStatus.localeCompare(user2.mealStatus);
      };
const {user}=useAuth();

    const axiosSecure=useAxiosSecure();

    const {data: requestedmeals = [],isLoading, isPending: r_meal_loading, refetch} = useQuery({
        queryKey: ['r_meals',user?.email,currentPage,itemsPerPage], 
        queryFn: async() =>{
            const res = await axiosSecure.get(`/requestedmeals?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`);
            let sortedmeals = res.data.sort(comparemeals);
            set_meals_to_show(sortedmeals);
            return res.data;
        }
    })

  
console.log("requested meals",requestedmeals)
const numberOfPages = Math.ceil(datacount / itemsPerPage);


const pages = [...Array(numberOfPages).keys()];
const handleItemsPerPage = (e) => {
  const val = parseInt(e.target.value);
  console.log(val);
  setItemsPerPage(val);
  setCurrentPage(0);
};

    return (
        <div>
  


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
                  <th>Likes Count</th>
                  <th>Reviews Count </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestedmeals.map((meal) => (
                  <tr key={meal._id}>
                    <th>{meal.mealTitle}</th>
                    <td>{meal.likes}</td>
                    <td>{meal.reviews}</td>
                    <td>{meal.mealStatus}</td>
                    
                    <td>
                  

                      <button
                        onClick={() => {
                          handleDelete(meal._id);
                        }}
                        className="btn ms-1 btn-xs btn-error text-white"
                      >
                        {" "}
                        Cancel{" "}
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

export default RequestedMeals;