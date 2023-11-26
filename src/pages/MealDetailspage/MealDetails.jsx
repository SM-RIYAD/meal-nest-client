import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SharedBanner from '../../shared/SharedComponents/SharedBanner';
import { Rating } from '@smastrom/react-rating';
const MealDetails = () => {
    const meal = useLoaderData();
    console.log("this is meal in details",meal)
    return (
        <div>

            <SharedBanner title={meal.mealTitle}/>
           <div className='flex gap-5 mt-10 lg:flex-row flex-col mx-auto max-w-6xl'>
<div className='lg:w-1/2 h-[400px]'>
<img className=' h-full  object-cover' src={meal.mealImage} alt="" />


</div>
<div className='lg:w-1/2 space-y-3'>

    <p className='text-2xl font-bold'>{meal.mealTitle}</p>
    <p className='text-base text-gray-400'><i> by {meal.adminName} at {meal.time} </i> </p>
    <Rating
      style={{ maxWidth: 120 }}
      value={meal.rating}
      readOnly
    />
    <p >{meal.description}</p>
<div className='flex items-center'>
    {/* <p className='font-bold text-xl text-gray-300 pe-2'>Ingridiants:</p> */}
<button className="btn   btn-outline text-red-400  hover:bg-white  hover:text-red-400">{meal.ingredients}</button>
</div>
<div className='flex gap-5'>

    <button className='btn btn-primary bg-red-500 text-white border-none '>Requested meal</button>
    <button className='btn btn-primary'>Like</button>
</div>
   
</div>


           </div>


        </div>
    );
};

export default MealDetails;