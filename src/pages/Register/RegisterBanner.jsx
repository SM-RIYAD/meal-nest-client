import React from 'react';

const RegisterBanner = () => {
    return (
        <div>
             <div className="pb-5 relative">
      <div
        className="hero min-h-[350px] bg-cover relative"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/human-resources-concept-with-people_23-2150389123.jpg?size=626&ext=jpg&ga=GA1.1.2010618524.1694701074&semt=sph)",
        }}
      >
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-80"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Register</h1>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default RegisterBanner;