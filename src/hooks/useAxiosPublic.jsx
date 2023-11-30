import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://meal-nest-server-orpin.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

