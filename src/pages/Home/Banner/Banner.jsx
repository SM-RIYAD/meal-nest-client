import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
const Banner = () => {
  AOS.init();
  return (
    <div>
      <div className=" w-full relative  ">
        <div
          className="hero min-h-screen  min-w-screen bg-cover w-full relative"
          style={{
            backgroundImage:
              "url(https://static.tnn.in/thumb/msid-96192012,width-1280,height-720,resizemode-75/96192012.jpg)",
          }}
        >
          <div className="hero-overlay absolute inset-0 bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content relative z-10">
            <div className="mt-20">
              <div className="flex flex-col justify-center items-center">
                <h1
                  data-aos-delay="100"
                  data-aos-duration="2000"
                  data-aos-easing="ease-in-out"
                  data-aos="fade-left"
                  className="mb-5 lg:text-6xl text-4xl  text-white font-extrabold"
                >
                  Elevate Your Campus Cuisine
                </h1>
                <p
                  data-aos-delay="1100"
                  data-aos-duration="2000"
                  data-aos-easing="ease-in-out"
                  data-aos="fade-right"
                  className=" text-white text-xl"
                >
                  Welcome to MealNest Hub, where seamless hostel living meets
                  delightful dining experiences. Our comprehensive hostel
                  management system ensures students enjoy not only comfortable
                  accommodation but also a variety of well-curated, nutritious
                  meals.
                </p>
                <div
                  data-aos="fade-up"
                  data-aos-delay="2100"
                  data-aos-duration="2000"
                  data-aos-easing="ease-in-out"
                  className="flex lg:flex-row flex-col"
                >
                  {/* <input
                    type="email"
                    placeholder="Search a meal"
                    className="input  mt-5 input-bordered border-none rounded-none "
                    required
                  /> */}
                  <Link to={"/register"}>
                  <button className="btn mt-5  btn-outline rounded-none hover:bg-red-500 w-[200px] h-[50px]  text-white hover:border-none  ">
                    Join Us
                  </button>
                  </Link>
               
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
