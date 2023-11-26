import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from './useAxiosPublic';

const useReview = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
const axiosPublic=useAxiosPublic();
    const {data: reviews = [], isPending: review_loading, refetch} = useQuery({
        queryKey: ['reviewss'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/reviews');
            return res.data;
        }
    })
     return [reviews, review_loading, refetch]
};
export default useReview;