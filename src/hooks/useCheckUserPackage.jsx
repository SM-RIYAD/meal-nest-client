import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCheckUserPackage = () => {
    const { user, loading } = useAuth();



   
    const axiosSecure = useAxiosSecure();
    const { data: dontHavePackage, isPending: dontHavePackageLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or has package or not', user)
            const res = await axiosSecure.get(`/checkHasPackage/${user.email}`);
            // console.log(res.data);
            return res.data?.DontHasPackage;
        }
    })
    return [dontHavePackage, dontHavePackageLoading]
};

export default useCheckUserPackage;