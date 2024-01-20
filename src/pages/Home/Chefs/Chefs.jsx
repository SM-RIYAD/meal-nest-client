import React from 'react';
import Marquee from "react-fast-marquee";
const Chefs = () => {
    return (
        <div className='grid my-10'>
            <div className='lg:max-w-6xl mx-auto my-10 text-red-400'>
            <h1 className='text-3xl mb-5 uppercase font-bold text-center '>Chefs picks</h1>
            <p className=' font-bold  text-red-300  text-center p-2'>Delight your taste buds with our Chef's Picks – a curated collection of culinary gems chosen by our talented chefs. Discover their personal favorites, each dish a testament to their passion and expertise. Elevate your dining experience with these exquisite selections. </p>
            </div>
          
            <Marquee>
<div className="hover:scale-95 me-5  " >
        <div className="card xl:w-96  lg:w-80 md:w-96 w-56 bg-base-100 shadow-xl image-full border  border-stone-100">
          <figure className="h-56">
            <img
              className=" w-full h-full object-fill"
              src="https://i.ibb.co/pbKkLyx/Pancakes.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="card-actions h-40 justify-end items-end">
              <h2 className="card-title text-red-200 font-bold text-2xl">Pancake</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="hover:scale-95 mx-5   " >
        <div className="card xl:w-96  lg:w-80 md:w-96 w-56 bg-base-100 shadow-xl image-full border  border-stone-100">
          <figure className="h-56">
            <img
              className=" w-full h-full object-fill"
              src="https://i.ibb.co/b7GD8dM/Spaghetti-Bolognese.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="card-actions h-40 justify-end items-end">
              <h2 className="card-title text-red-200 font-bold text-2xl">Spaghetti Bolognese</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="hover:scale-95 mx-5   " >
        <div className="card xl:w-96  lg:w-80 md:w-96 w-56 bg-base-100 shadow-xl image-full border  border-stone-100">
          <figure className="h-56">
            <img
              className=" w-full h-full object-fill"
              src="https://i.ibb.co/y4DnVfB/Chicken-Caesar-Salad.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="card-actions h-40 justify-end items-end">
              <h2 className="card-title text-red-200 font-bold text-2xl">Chicken Caesar Salad</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="hover:scale-95 mx-5   " >
        <div className="card xl:w-96  lg:w-80 md:w-96 w-56 bg-base-100 shadow-xl image-full border  border-stone-100">
          <figure className="h-56">
            <img
              className=" w-full h-full object-fill"
              src="https://i.ibb.co/BrJKJMc/Vegetarian-Wrap.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="card-actions h-40 justify-end items-end">
              <h2 className="card-title text-red-200 font-bold text-2xl">Vegetarian Wrap</h2>
            </div>
          </div>
        </div>
      </div>
          </Marquee>
        </div>
    );
};

export default Chefs;