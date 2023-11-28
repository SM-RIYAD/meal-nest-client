import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Swal from 'sweetalert2';
const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('users');
            console.log("this are the users in response:",res.data)
            return res.data;
        }
    })

console.log("this are the users: ",users)
    
const handleMakeAdmin = user =>{
  axiosPublic.patch(`/users/admin/${user._id}`)
  .then(res =>{
      console.log(res.data)
      if(res.data.modifiedCount > 0){
          refetch();
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500
            });
      }
else 
      {

        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `${user.name} is already an Admin !`,
          showConfirmButton: false,
          timer: 1500
        });
      }
  })
}

    return (
        <div>
         <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Username
 
 </th>
        <th>UserEmail</th>
        <th>Subscription STatus</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {

 users.map((user)=> <tr key={user._id}>
  <th>{user.name}</th>
  <td>{user.email}</td>
  <td>{user.badge}</td>
  <td><button onClick={()=>{handleMakeAdmin(user)}} className='btn btn-xs btn-error text-white'> Make admin </button></td>
</tr>

 )

      }
      {/* <tr>
        <th></th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr> */}

      {/* <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
   
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr> */}
    </tbody>
  </table>
</div>


        </div>
    );
};

export default ManageUsers;