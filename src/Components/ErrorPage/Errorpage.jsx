import React from 'react';
import { Link, useRouteError } from "react-router-dom";
const Errorpage = () => {
    return (
        <div className="flex flex-col justify-center items-center  p-10">
   
     <img className='w-1/2 ' src="https://i.ibb.co/44ZnDsk/a8121abee959e18cbad25ad4046f76d8.gif" alt="" srcset="" />
        <p className=" text-4xl text-red-600 font-bold">
        Sorry,page not found!   Go back to   <Link to="/">
          <button className="btn btn-error">Home</button>
        </Link>
      
        </p>
      
    </div>
    );
};

export default Errorpage;