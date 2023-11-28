import React from 'react';
import SharedBanner from '../../shared/SharedComponents/SharedBanner';


import useMeals from "../../hooks/useMeals";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import MealCard from '../Home/MealCard';
import MealHorizontalCard from '../../Components/MealHorizontalCard';
const UpcomingMealsforUser = () => {
    const axiosPublic= useAxiosPublic();
    const [showmeals, setShowmeals] = useState([]);
   
    const {data: meals = [], isPending: loading, refetch} = useQuery({
        queryKey: ['upcomingmeal'], 
        queryFn: async() =>{
            const res = await axios.get('http://localhost:5000/upcomingmeals');
            console.log("upcoming meals",res.data)

            const mealdata= res.data;
            const sortedMeals = mealdata.sort((a, b) => b.likes - a.likes);
            setShowmeals(sortedMeals);
            return res.data;
        }
    })
console.log("upcoming meals",showmeals);


    
    return (
        <div>
            <SharedBanner title={"Upcoming meals"}/>


            <div className="grid mt-10 gap-5 p-5 mx-auto max-w-6xl  lg:p-0  grid-cols-1 lg:grid-cols-2">
          {showmeals.map((meal, idx) => (
           
            <MealHorizontalCard refetch={refetch} meal={meal} key={meal._id} />
          ))}
</div>
        </div>
    );
};

export default UpcomingMealsforUser;