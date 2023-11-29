import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Myreviews = () => {
  const { user } = useAuth();
  const url = `/reviews?email=${user?.email}`;
  const navigate = useNavigate();
  const [datacount, setDatacount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  
  const [show_reviews, setShowReviews] = useState([]);

  const {data: count = {}, isPending: count_loading, } = useQuery({
    queryKey: ['all_review_count'],

    queryFn: async() =>{
        const res = await axiosPublic.get(`/AllreviewsCount?email=${user?.email}`);
        setDatacount(res.data.count)
        console.log("data count review",res.data.count )
        return res.data;
    }
})

  const {
    data: reviews = [],
    isPending: review_loading,
    refetch,
  } = useQuery({
    queryKey: ["reviews",user?.email,currentPage,itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get( `/reviews?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`);
      setShowReviews(res.data);
      return res.data;
    },
  });

  const handleView = (id) => {
    navigate(`/mealdetails/${id}`);
  };
const handleEdit =(e)=>{
    e.preventDefault();

    const reviewtext= e.target.review_text.value;

    const reviewId=e.target.review_id.value;

    const reviewinfo={

        reviewcontent:reviewtext



    }
    console.log("review text",reviewtext);

    axiosPublic
    .put(`/update/reviewtext/${reviewId}`, reviewinfo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Review Updated Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        refetch();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors if any
    });
  

}
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
  };
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
      {review_loading ? (
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
                  <th>Given Review</th>

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
                      <button
                        onClick={() => {
                          handleView(review.reviewdmeal_id);
                        }}
                        className="btn btn-xs btn-error ms-1 text-white"
                      >
                        {" "}
                        View meal{" "}
                      </button>
                      <button
                        onClick={() => {
                            document.getElementById("my_modal_1").showModal();
                        }}
                        className="btn btn-xs btn-error ms-1 text-white"
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <dialog id="my_modal_1" className="modal">
                <ToastContainer />
                  <div className="modal-box">
                  <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
                  <form onSubmit={ handleEdit} className="card-body  ">
                  <div className="grid grid-cols-1 gap-2">
                <div className="form-control">
           
                  <label className="label">
                    <span className="label-text text-black">Review </span>
                  </label>
                  <textarea
                    type="text"
                    name="review_text"
                    defaultValue={review.reviewcontent}
                    placeholder="User Name"
                    className="input input-bordered"
                    required
                  />
                       <textarea
                    type="text"
                    name="review_id"
                    value={review._id}
                    placeholder="User Name"
                    className="input hidden input-bordered"
                    required
                  />
                </div>
           

             

        
                <div className="form-control ">
             
               <input
                  type="submit"
            
                  value="Update"
                  className="btn bg-red-500 mt-5 text-white border-none w-full  btn-primary"
                /> <div className="modal-action">
               
                </div>
              
                </div>

             
                
              
              </div>
              </form>
                    
                  </div>
                </dialog>
                    </td>
                  </tr>
                ))}
               
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

export default Myreviews;
