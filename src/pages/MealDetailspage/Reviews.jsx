import React, { useState } from "react";
import ReviewCards from "./ReviewCards";
import useAuth from "../../hooks/useAuth";
import { hashKey, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useReview from "../../hooks/useReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Reviews = ({ meal }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  //  const [reviews, review_loading, refetch] = useReview();

  const url = `/reviews?mealid=${meal?._id}`;
  const SuccessToast = (successmsg) =>
    toast.success(successmsg, { position: "bottom-center" });

  const reviewUpdateUrl = `/updatereviewcount/${meal?._id}`;
  const {
    data: reviews = [],
    isPending: review_loading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });
  console.log(" revies fromm db", reviews, "for ", meal?._id);

  const [reviewToPost, setReviewToPost] = useState("");
  const handleAddReview = () => {
    if (reviewToPost.length === 0) {
      return;
    }
    if (user?.email) {
      console.log(" review", reviewToPost);

      const reviewinfo = {
        reviewcontent: reviewToPost,
        reviewgiversEmail: user.email,
        reviewgiversName: user.displayName,
        reviewdmeal_id: meal._id,
        reviewdmeal_name: meal.mealTitle,
        reviewdmeal_likes:meal.likes,
        reviewdmeal_review_count:meal.reviews,
        
      };
      console.log("review info", reviewinfo);

      axiosPublic
        .post("/addreview", reviewinfo, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Review Given Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });

            ///updating review count
            axiosSecure
              .get(reviewUpdateUrl)
              .then((response) => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                  // Swal.fire({
                  //   title: "Success!",
                  //   text: "Successfully incremented job",
                  //   icon: "success",
                  //   confirmButtonText: "Cool"
                  // });
                  SuccessToast("Successfully incremented Review count  !");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                // Handle errors if any
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if any
        });
    } else {
      Swal.fire({
        title: "Failed to give review!",
        text: "You have to be logged in",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="lg:mx-auto p-4 max-w-6xl">
      <h1 className="text-xl text-red-400 my-5 ">
        {" "}
        <u>Reviews:</u>
      </h1>

      <div className="flex lg:flex-row  flex-col w-full">
        <textarea
          type="email"
          cols="30"
          onChange={(e) => {
            setReviewToPost(e.target.value);
          }}
          rows="30"
          placeholder="Enter a Review"
          className="input  mt-5 input-bordered border-none  w-1/2 rounded-none "
          required
        />
        <button
          onClick={handleAddReview}
          className="btn mt-5  btn-primary border-none rounded-none bg-red-500  text-white hover:border-none  "
        >
          Submit
        </button>
      </div>
      <div className="  space-y-5 mt-5">
        {reviews.map((review, idx) => (
          <ReviewCards review={review} key={idx}></ReviewCards>
        ))}
        {/* <ReviewCards></ReviewCards> */}
        {/* <ReviewCards></ReviewCards> */}
      </div>
    </div>
  );
};

export default Reviews;
