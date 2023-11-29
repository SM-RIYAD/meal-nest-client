import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Swal from 'sweetalert2';
const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();

    const [datacount, setDatacount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users',currentPage,itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`users?page=${currentPage}&size=${itemsPerPage}`);
            console.log("this are the users in response:",res.data)
            return res.data;
        }
    })
    const {data: count = {}, isPending: count_loading, } = useQuery({
      queryKey: ['user_count'],

      queryFn: async() =>{
          const res = await axiosPublic.get('/AllusersCount');
          setDatacount(res.data.count)
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
const numberOfPages = Math.ceil(datacount / itemsPerPage);


const pages = [...Array(numberOfPages).keys()];
const handleItemsPerPage = (e) => {
  const val = parseInt(e.target.value);
  console.log(val);
  setItemsPerPage(val);
  setCurrentPage(0);
};

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
  <div className="pagination w-full flex my-5 justify-center">
                    {/* <p>Current page: {currentPage}</p> */}
                    {/* <button onClick={handlePrevPage}>Prev</button> */}
                    {pages.map((page) => (
                      <button
                        className={`${
                          currentPage === page
                            ? "bg-red-400 text-white"
                            : "bg-gray-300 text-black"
                        } btn btn-sm `}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                      >
                        {page}
                      </button>
                    ))}
                    {/* <button onClick={handleNextPage}>Next</button> */}
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPage}
                      name=""
                      id=""
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
</div>


        </div>
    );
};

export default ManageUsers;