
import React from 'react';
import useAuth from '../../hooks/useAuth';
import { hashKey, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {useState, useEffect} from 'react';
import useMeals from '../../hooks/useMeals';

const AdminProfile = () => {

    // const meals= useMeals();
    const axiosPublic=useAxiosPublic();
    const [filtered_meals,setFiltered_meals]=useState([]);
    const {user} =useAuth();


    const {data: meals = [], isPending: loading, refetch} = useQuery({
        queryKey: ['meals'],
  
        queryFn: async() =>{
            const res = await axiosPublic.get(`/meals`);
            let filteredMeals= [...res.data].filter(meal=>meal?.adminEmail===user?.email);
            setFiltered_meals(filteredMeals);
            return res.data;
        }
    })
  




    console.log("meals in admin",meals)

    const filteredMeals= [...meals].filter(meal=>meal?.adminEmail===user?.email);
    console.log(" filtered meals in admin",filteredMeals)


    return (
        <div>
             <div className='flex lg:flex-row flex-col  gap-10 p-20 '>
                 
                 <div className='  flex flex-col space-y-3 justify-center'>

                    <h1 className='text-4xl font-bold text-red-500'> {user?.displayName}</h1>

                    <p className='font-bold text-xl'>Email: </p>
                    <h1 className=' font-bold text-gray-500'> {user?.email}</h1>

                    <p className='text-xl'>You have added {filtered_meals.length} meals</p>
                    <div className="flex">
           
              
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

export default AdminProfile;