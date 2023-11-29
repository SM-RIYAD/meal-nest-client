import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllReviews = () => {
    const url = `/reviews`;
const navigate= useNavigate();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const [show_reviews,setShowReviews]=useState([])
    const {
      data: reviews = [],
      isPending: review_loading,
      refetch,
    } = useQuery({
      queryKey: ["reviews"],
      queryFn: async () => {
        const res = await axiosPublic.get(url);
        setShowReviews(res.data)
        return res.data;
      },
    });






const handleSortbyLike = () => {
    console.log("sort by.reviewdmeal_likes like is clicked");
    const sortedReviews = [...show_reviews].sort((a, b) => b.reviewdmeal_likes - a.reviewdmeal_likes);
    setShowReviews(sortedReviews);
};

const handleSortbyReview = () => {
    console.log("sort by review is clicked");
    const sortedRReviews = [...show_reviews].sort((a, b) => b.reviewdmeal_review_count - a.reviewdmeal_review_count);
    setShowReviews(sortedRReviews);
};





    const handleView=(id)=>{

        navigate(`/mealdetails/${id}`)



    }

    const  handleDelete=(id)=>{
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
              fetch(`http://localhost:5000/deletereview/${id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Review has been deleted.", "success");
                    // const remaining = jobs.filter(job => job._id !== id);
                    // setJobs(remaining);
      
                    refetch();
                  }
                });
            }
          });

    }
    return (
        <div>
            

            {review_loading ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div> 
            <div className='flex w-full justify-between my-10'>

                <button onClick={handleSortbyLike} className='btn btn-sm btn-error bg-red-500 ms-1 text-white'>SORT BY LIKE COUNT</button>
                <button onClick={handleSortbyReview} className='btn btn-sm btn-error bg-red-500 ms-1 text-white'>SORT BY REVIEW COUNT</button>

                
            </div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Meal Title</th>
                  <th>Likes Count</th>
                  <th>Reviews Count </th>
                  <th>Given Review</th>
                  <th>Review givers Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {show_reviews.map((review) => (
                  <tr key={review._id}>
                    <th>{review.reviewdmeal_name}</th>
                    <td>{review.reviewdmeal_likes}</td>
                    <td>{review.reviewdmeal_review_count}</td>
                    <td>{review.reviewcontent}</td>
                    <td>{review.reviewgiversEmail}</td>
                    <td>
                 
                      <button
                        onClick={() => {
                          handleDelete(review._id);
                        }}
                        className="btn ms-1 btn-xs btn-error text-white"
                      >
                        {" "}
                        Delete{" "}
                      </button>
                      <button onClick={()=>{handleView(review.reviewdmeal_id)}} className="btn btn-xs btn-success ms-1 text-white">
                        {" "}
                        view meal{" "}
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

export default AllReviews;