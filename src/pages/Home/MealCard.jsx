import React from 'react';
import { Rating } from '@smastrom/react-rating';

const MealCard = ({meal}) => {
    return (
        <div className=''>
            <div className="card card-compact lg:w-96 w-auto bg-base-100 shadow-xl">
  <figure className='bg-cover p-2'><img src={meal.mealImage} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{meal.mealTitle}</h2>
    {/* <p >Rating: }</p> */}
    <Rating
      style={{ maxWidth: 120 }}
      value={meal.rating}
      readOnly
    />
    <p className='font-bold'>${meal.price}</p>
    <div className="card-actions justify-start">
      <button className="btn mt-5 btn-s btn-outline text-red-400  hover:bg-red-500   hover:border-none">Meal Details</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default MealCard;