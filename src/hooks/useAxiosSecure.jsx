import axios from "axios";
import { useEffect, useState  } from "react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'https://job-sphere-server.vercel.app/',
    withCredentials: true
});
// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:5000/',
//     withCredentials: true
// });

const useAxiosSecure = () => {
    
   
    const {  logOut } = useContext(AuthContext);
  const navigate= useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked in the interceptor', error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('logout the user')
                logOut()
                    .then(() => { 
                        navigate("/login");
                      
                    })
                    .catch(error => console.log(error))
           

            }
        })
    }, [])
    return axiosSecure;
};


export default useAxiosSecure;


