import React from 'react';

const MealCard = ({meal}) => {
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src={meal.mealImage} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{meal.mealTitle}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default MealCard;