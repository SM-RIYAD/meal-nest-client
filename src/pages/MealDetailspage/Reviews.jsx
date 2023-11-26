import React, {useState} from 'react';
import ReviewCards from './ReviewCards';
import useAuth from '../../hooks/useAuth';
import { hashKey } from '@tanstack/react-query';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import useReview from '../../hooks/useReview';
const Reviews = ({meal}) => {
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic();
     const [reviews, review_loading, refetch] = useReview();

     console.log(" revies fromm db",reviews);
   
const [reviewToPost,setReviewToPost]= useState("");
    const handleAddReview=()=>{

console.log(" review" ,reviewToPost);

const reviewinfo={
      
    reviewcontent:reviewToPost,
    reviewgiversEmail:user.email,
    reviewgiversName:user.displayName,
    reviewdmeal_id:meal._id,
    reviewdmeal_name:meal.mealTitle



}
console.log("review info",reviewinfo);

axiosPublic.post("/addreview",reviewinfo, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    console.log(response.data);
    if (response.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Review Given Successfully",
        icon: "success",
        confirmButtonText: "Cool"
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    // Handle errors if any
  });


    }


    return (
        <div  className='mx-auto max-w-6xl'>
            <h1 className='text-xl text-red-400 my-5 '> <u>Reviews:</u></h1>


            <div className="flex lg:flex-row  flex-col w-full">
                  <textarea
                    type="email"  cols="30"
                    onChange={(e)=>{
                        setReviewToPost(e.target.value)

                    }}
                    rows="30"
                    placeholder="Enter a Review"
                    className="input  mt-5 input-bordered border-none  w-1/2 rounded-none "
                    required
                  />
                  <button onClick={handleAddReview} className="btn mt-5  btn-primary rounded-none bg-red-500  text-white hover:border-none  ">
                    Submit
                  </button>
                  
                </div>
                <div className='  space-y-5 mt-5'>
                    {

reviews.map((review,idx)=> <ReviewCards review={review} key={idx}></ReviewCards>)
                    }
                {/* <ReviewCards></ReviewCards> */}
                {/* <ReviewCards></ReviewCards> */}
                </div>
                

        </div>
    );
};

export default Reviews;