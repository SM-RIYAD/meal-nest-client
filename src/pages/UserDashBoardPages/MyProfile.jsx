import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import { hashKey, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import {useState} from
const MyProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [badge_img, setbadge_image] = useState("");
  const {
    data: user_to_show = {},
    isPending: isuser_to_show_Loading,
    refetch,
  } = useQuery({
    queryKey: ["users_to_show", user?.email],

    queryFn: async () => {
      // console.log('asking or checking is admin', user)
      const res = await axiosPublic.get(`/specificUser/${user?.email}`);
      console.log("user details", res.data);
      if (res.data.user?.badge === "GOLD") {
        setbadge_image("https://i.ibb.co/dG1gthP/gold.jpg");
      } else if (res.data.user?.badge === "PLATINUM") {
        setbadge_image("https://i.ibb.co/NjgFsvN/platinum-2.jpg");
      } else if (res.data.user?.badge === "SILVER") {
        setbadge_image("https://i.ibb.co/Zmrh7K7/silvermember.jpg");
      } else {
        setbadge_image("https://i.ibb.co/M6tVJCY/bronze.jpg");
      }

      return res.data;
    },
  });
  console.log("user details from transtack", user_to_show);
  const handleEdit =(e)=>{
    e.preventDefault();

    const aboutmetext= e.target.aboutme_text.value;

   

    const aboutmeinfo={

        aboutme:aboutmetext



    }
    console.log("user_to_show_id",user_to_show.user._id);

    axiosPublic
    .patch(`/update/aboutme/${user_to_show?.user._id}`,aboutmeinfo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "About me Updated Successfully",
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
  return (
    <div>
      <div className="flex lg:flex-row flex-col  gap-10 p-20 ">
        <div className=" flex items-start  ">
          <img
            className="rounded-full h-[200px] w-[200px] object-cover"
            src={user?.photoURL}
          />
        </div>

        <div className="  flex flex-col space-y-3 justify-center">
          <h1 className="text-4xl font-bold text-red-400">
            {" "}
           <i>  {user?.displayName}</i>
          </h1>

          {/* <p className="font-bold text-xl">Email: </p> */}
          <h1 className=" text-xl text-gray-500"> {user?.email}</h1>
          {/* <div className="flex">
                    <img className='w-30 h-30 ovject-cover' src={badge_img} alt="" />
              
                   



                    </div> */}
        </div>
      </div>

      <div className="flex gap-10 px-20 ">
        <div className="w-2/3 space-y-4">
          <p className="text-START text-red-400  font-bold text-4xl"> <i>ABOUT ME</i> </p>
          <p className="text-gray-500">
         {user_to_show?.user?.aboutme}
          </p>

          <button onClick={() => {
                            document.getElementById("my_modal_1").showModal();
                        }} className="btn btn-primary bg-red-400 border-none  text-white">
            EDIT
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
                    <span className="label-text text-black">About Me </span>
                  </label>
                  <textarea
                    type="text"
                    name="aboutme_text"
                    defaultValue={user_to_show?.user?.aboutme}
                    placeholder="Enter About me"
                    className="input input-bordered"
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
        </div>
        <div className="flex items-start w-1/3">
          <img className="w-[250px] h-[250px] object-cover" src={badge_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
