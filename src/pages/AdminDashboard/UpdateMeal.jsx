import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SharedBanner from '../../shared/SharedComponents/SharedBanner';

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
const UpdateMeal = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const meal = useLoaderData();
    const image_hosting_key =  import.meta.env.VITE_ImageHostingKey;
    console.log("image key",image_hosting_key);
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const {
        _id,
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
        adminEmail}=meal;
    console.log("this is from loader",meal);
    let imageToUpdate;
const onSubmit= async(data)=>{

console.log("this is data",data);

imageToUpdate=data.mealimage[0] ||  mealImage;
console.log("this is image",imageToUpdate);

// const imageFile = { image: data.mealimage[0] }
if(data.mealimage[0]){

    const imageFile = { image: data.mealimage[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    if (res.data.success) {
        // now send the menu item data to the server with the image url
    
    
    console.log("imageurl from imagebb",res.data.data.display_url );

    const mealinfotoUpdate= {mealTitle:data.mealtitle,
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
    
   
        console.log("this is meal info for ", mealinfotoUpdate)
        console.log("to add");
        axiosPublic.put(`/updatemeal/${ _id}` ,  mealinfotoUpdate, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Meal Updated Successfully",
                icon: "success",
                confirmButtonText: "Cool"
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors if any
          });
        // axiosPublic.post("addmeal",mealinfo, {
        //     headers: {
        //       "Content-Type": "application/json"
        //     }
        //   })
        //   .then((response) => {
        //     console.log(response.data);
        //     if (response.data.insertedId) {
        //       Swal.fire({
        //         title: "Success!",
        //         text: "Meal Added Successfully",
        //         icon: "success",
        //         confirmButtonText: "Cool"
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //     // Handle errors if any
        //   });






   
   
    }


} else{

    const mealinfotoUpdate= {mealTitle:data.mealtitle,
        mealType:data.mealtype ,
        mealImage:mealImage,
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
    
   
        console.log("this is meal info for ", mealinfotoUpdate)
        console.log("to add");
        axiosPublic.put(`/updatemeal/${ _id}` ,  mealinfotoUpdate, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Meal Updated Successfully",
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






    return (
        <div className=''>
<SharedBanner title={"UPDATE A MEAL"}></SharedBanner>



<div>
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
                  defaultValue={mealTitle}
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
                <select defaultValue={mealType} {...register('mealtype', { required: true })}
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

                <input {...register('mealimage', )} type="file" className="file-input w-full max-w-xs" />
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
                     rows="10"placeholder="eg. water,suger etc" defaultValue={ingredients}></textarea>
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
                  defaultValue={price}
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
                  defaultValue={time}
                  {...register("mealposttime", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black"> Reviews</span>
                </label>
                <input
                  type="number"  defaultValue={reviews}
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
                     rows="10"placeholder="meal description"  defaultValue={description}></textarea>
            
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Likes</span>
                </label>
                <input
                  type="number"  defaultValue={likes}
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
                  type="number"  defaultValue={rating}
                  placeholder="Rating"
                  {...register("rating", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Update Meal"

              className="btn btn-block text-white border-none bg-emerald-500 "
            />
         
          </form>
        </div>
      </div>
</div>
        </div>
    );
    
};

export default UpdateMeal;