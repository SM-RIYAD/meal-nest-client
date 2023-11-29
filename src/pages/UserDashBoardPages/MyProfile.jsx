import React from 'react';
import useAuth from '../../hooks/useAuth';
import { hashKey, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {useState, useEffect} from 'react';
// import {useState} from 
const MyProfile = () => {
const axiosPublic=useAxiosPublic();
    const {user} =useAuth();
const[badge_img,setbadge_image]=useState("");
    const { data: user_to_show={}, isPending: isuser_to_show_Loading ,refetch} = useQuery({
        queryKey: ["users_to_show",user?.email],
    
        queryFn: async () => {
            // console.log('asking or checking is admin', user)
            const res = await axiosPublic.get(`/specificUser/${user?.email}`);
            console.log( "user details",res.data);
            if(res.data.user?.badge==='GOLD'){
                setbadge_image("https://i.ibb.co/dG1gthP/gold.jpg");
            } 

           else if(res.data.user?.badge==='PLATINUM'){
                setbadge_image("https://i.ibb.co/NjgFsvN/platinum-2.jpg");
            }

          else  if(res.data.user?.badge==='SILVER'){
                setbadge_image("https://i.ibb.co/Zmrh7K7/silvermember.jpg");
            }
            else{

                setbadge_image("https://i.ibb.co/M6tVJCY/bronze.jpg");
            }

            return res.data;
        }
    })
    console.log('user details from transtack', user_to_show)



    return (
        <div>
            <div className='flex  gap-10 p-20 '>
                 
                 <div className='  flex flex-col space-y-3 justify-center'>

                    <h1 className='text-4xl font-bold text-red-500'> {user?.displayName}</h1>

                    <p className='font-bold text-xl'>Email: </p>
                    <h1 className=' font-bold text-gray-500'> {user?.email}</h1>
                    <div className="flex">
                    <img className='w-30 h-30 ovject-cover' src={badge_img} alt="" />
              
                    {/* <h1>Badge: {user_to_show.user?.badge}</h1> */}



                    </div>
                 
                 </div>
                 <div
                  className=" flex items-center  "
               
                >
                  <img className="rounded-full h-[350px] w-[350px] object-cover" src={user?.photoURL} />
                </div>



            </div>
        </div>
    );
};

export default MyProfile;