import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
// import { AuthContext } from "../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddMeal = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [reason,setReason]=useState("");

  
  const image_hosting_key =  import.meta.env.VITE_ImageHostingKey;
  console.log("image key",image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async(data) => {
    const imageFile = { image: data.mealimage[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
console.log("this is res",res);
    if (res.data.success) {
        // now send the menu item data to the server with the image url
    
    
    console.log("imageurl from imagebb",res.data.data.display_url );

    const mealinfo= {mealTitle:data.mealtitle,
        mealType:data.mealtype ,
        mealImage:res.data.data.display_url,
        ingredients:data.ingredients,
        description: data.description,
        price:parseFloat(data.price),
        rating:parseInt(data.rating),
        time:data.mealposttime,
      
        likes:parseInt(data.likes),
        reviews:parseInt(data.reviews),
        adminName:data.distributorname,
        adminEmail:data.distributoremail}
         
    
    
    ;
    
    if(reason==="to Add"){
        console.log("this is meal info for ",reason, " ", mealinfo)
        console.log("to add");

        axiosPublic.post("addmeal",mealinfo, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Meal Added Successfully",
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
    else {
        console.log("this is meal info for ",reason, " ", mealinfo)
        console.log("to highlight");

        axiosPublic.post("addtoupcomingmeal",mealinfo, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Upcoming Meal Added Successfully",
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
    }










  };


  
  return (
    <div>
      <h1 className="text-center font-bold my-4">Add A meal</h1>
      <div className="min-h-screen px-5">
        <ToastContainer />

        <div className="lg:max-w-6xl   mx-auto  rounded-xl shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body border ">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Meal Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Meal Title"
                  {...register("mealtitle", { required: true })}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black"> Meal Type</span>
                </label>
                <select defaultValue="default" {...register('mealtype', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a Type</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            
                            </select>
              </div>

              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-black">Meal Image</span>
                </label>

                <input {...register('mealimage', { required: true })} type="file" className="file-input w-full max-w-xs" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Ingredients</span>
                </label>
                {/* <input
                  type="text"
                  name="photourl"
                  placeholder="enter photo url"
                  className="input input-bordered"
                  required
                /> */}
                   <textarea {...register('ingredients')} className="textarea textarea-bordered h-10" 
                     cols="30"
                     rows="10"placeholder="eg. water,suger etc"></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">
                    Distributor Email
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="distributor's email"
                  {...register("distributoremail", { required: true })}
                  required
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">
                    Distributor Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Distributor Name"
                  {...register("distributorname", { required: true })}
                  required
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Time</span>
                </label>

                <input
                  type="time"
                  placeholder="meal posting time"
                  {...register("mealposttime", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black"> Reviews</span>
                </label>
                <input
                  type="number"
                  placeholder="review count"
                  {...register("reviews", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control  ">
                <label className="label">
                  <span className="label-text text-black">Description</span>
                </label>
                <textarea {...register('description')} className="textarea textarea-bordered h-10" 
                     cols="30"
                     rows="10"placeholder="meal description"></textarea>
            
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Likes</span>
                </label>
                <input
                  type="number"
                  placeholder="Likes count"
                  {...register("likes", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Rating</span>
                </label>
                <input
                  type="number"
                  placeholder="Rating"
                  {...register("rating", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Add Meal"
              onClick={()=>{setReason("to Add")}}
              className="btn btn-block text-white border-none bg-emerald-500 "
            />
              <input
              type="submit"
              value="Add to Upcoming meals"
              onClick={()=>{setReason("to highlight")}}
              className="btn btn-block text-white border-none bg-emerald-500 "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
