import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="pb-5 relative">
        <div
          className="hero min-h-screen bg-cover relative"
          style={{
            backgroundImage:
              "url(https://static.tnn.in/thumb/msid-96192012,width-1280,height-720,resizemode-75/96192012.jpg)",
          }}
        >
          <div className="hero-overlay absolute inset-0 bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content relative z-10">
            <div className="">
              <div className="flex flex-col justify-center items-center">
                <h1 className="mb-5 lg:text-6xl text-4xl  text-white font-extrabold">
                Elevate Your Campus Cuisine
                </h1>
                <p className=" text-white text-xl">
                Welcome to MealNest Hub, where seamless hostel living meets delightful dining experiences. Our comprehensive hostel management system ensures students enjoy not only comfortable accommodation but also a variety of well-curated, nutritious meals. 
                </p>
                <div className="flex lg:flex-row flex-col">
                  <input
                    type="email"
                    placeholder="Search a meal"
                    className="input  mt-5 input-bordered border-none rounded-none "
                    required
                  />
                  <button className="btn mt-5  btn-outline rounded-none hover:bg-red-500  text-white hover:border-none  ">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
