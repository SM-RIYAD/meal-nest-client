import React from 'react';

const Banner2 = () => {
    return (
        <div>
                <div className="pb-5 relative">
      <div
        className="hero min-h-[350px] bg-cover relative"
        style={{
          backgroundImage:
            "url(https://static.tnn.in/thumb/msid-96192012,width-1280,height-720,resizemode-75/96192012.jpg",
        }}
      >
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-80"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Log in</h1>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Banner2;