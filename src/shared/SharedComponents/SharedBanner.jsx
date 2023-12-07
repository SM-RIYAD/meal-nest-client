import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
const SharedBanner = ({ title }) => {
  AOS.init();
  return (
    <div>
      <div className=" w-full relative  ">
        <div
          className="hero h-[400px]  min-w-screen bg-cover w-full relative"
          style={{
            backgroundImage:
              "url(https://static.tnn.in/thumb/msid-96192012,width-1280,height-720,resizemode-75/96192012.jpg)",
          }}
        >
          <div className="hero-overlay absolute inset-0 bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content relative z-10">
            <div className="mt-20">
              <div className="flex flex-col justify-center items-center">
                <h1  data-aos-delay="100"
                  data-aos-duration="2000"
                  data-aos-easing="ease-in-out"
                  data-aos="fade-left" className="mb-5 lg:text-5xl text-4xl  text-white font-extrabold">
                {title}
                </h1>
                
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedBanner;
