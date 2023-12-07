import React from 'react';

const Subscribe = () => {
    return (
        <div>
             <div className="py-20 relative">
    <div
      className="hero min-h-[550px] bg-cover bg-fixed  "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D)",
          
      }}
    >
      <div className="hero-overlay  inset-0 bg-gradient-to-r from-black to-red-300 opacity-80"></div>
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="">
          <h1 className="mb-5 text-6xl text-center text-white font-bold">SUBSCRIBE MEAL NEST</h1>
          <div
            
                  className="flex lg:flex-row gap-5 flex-col"
                >
                  <input 
                    type="email"
                    placeholder="Enter your email address"
                    className="input w-[80%]  mt-5 input-bordered border-none rounded-none "
                    required
                  />
                  <button className="btn mt-5 w-[30%]  rounded-none bg-red-500 hover:bg-red-500 text-white border-none  ">
                    Subscribe
                  </button>
                </div>
        </div>
      </div>
    </div>
  </div>
        </div>
    );
};

export default Subscribe;