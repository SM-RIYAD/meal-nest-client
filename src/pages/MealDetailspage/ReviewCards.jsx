import React from 'react';

const ReviewCards = ({review}) => {
    return (
        <div className=' max-w-6xl '>
            <div className='w-1/2 '>

            <h1 className='font bold  text-xl'>{review.reviewgiversName}</h1>
            <p className='text-gray-400'> <i>{review.reviewcontent}</i> </p>
            </div>
           
        </div>
    );
};

export default ReviewCards;