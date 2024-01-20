import React from 'react';

const YourLiking = () => {
    return (
        <div className='lg:max-w-6xl mx-auto my-32 text-red-400'>  <div className="side-container ms-5 me-5 mt-14 md:mt-24">
        <h1 className=" text-center text-4xl md:mb-10 mb-5 font-bold  fontStyle">
          What do you like today?
        </h1>
        {/* <p className="text-gray-600 ">
          Consectetur numquam poro nemo veniam eligendi rem adipisci quo modi.
        </p> */}
        <div className="md:grid grid-cols-2 gap-5 md:mt-16 mt-10  ">
          <div className="bg-gray-50  p-5 mt-5 hover:opacity-60 transition duration-300 ">
            <h3 className="text-2xl font-bold mb-3">
              {" "}
              <img
                className="h-10"
                src="https://starbelly.bslthemes.com/wp-content/uploads/2022/05/category-1.png"
                alt=""
              />{" "}
              Starters
            </h3>
            <p className="text-gray-600">
              Starters are small dishes that precede a meal, often featuring
              cheese, vegetables, meat, or seafood. They can be hot or cold and
              are a great way to explore flavors.
            </p>
          </div>
          <div className="bg-gray-50 p-5 mt-5 hover:opacity-60 transition duration-300 ">
            <h3 className="text-2xl font-bold mb-3">
              {" "}
              <img
                className="h-10"
                src="https://starbelly.bslthemes.com/wp-content/uploads/2022/05/category-2.png"
                alt=""
              />{" "}
              Main dishes
            </h3>
            <p className="text-gray-600">
              Main dishes are the centerpiece of a meal, typically featuring a
              protein source like meat, fish, or tofu, accompanied by sides such
              as vegetables, rice, or pasta. They provide sustenance and
              satisfaction
            </p>
          </div>
          <div className="bg-gray-50 p-5 mt-5 hover:opacity-60 transition duration-300">
            <h3 className="text-2xl font-bold mb-3">
              {" "}
              <img
                className="h-10"
                src="https://starbelly.bslthemes.com/wp-content/uploads/2022/05/category-3.png"
                alt=""
              />{" "}
              Drink
            </h3>
            <p className="text-gray-600">
              Drinks are beverages consumed to quench thirst or add flavor to a
              meal. They can be alcoholic or non-alcoholic and may include
              water, juice, tea, coffee, wine, beer, or spirits.
            </p>
          </div>
          <div className="bg-gray-50 p-5 mt-5 hover:opacity-60 transition duration-300">
            <h3 className="text-2xl font-bold mb-3 ">
              {" "}
              <img
                className="h-10"
                src="https://starbelly.bslthemes.com/wp-content/uploads/2022/05/category-4.png"
                alt=""
              />{" "}
              Desserts
            </h3>
            <p className="text-gray-600">
              Desserts are sweet dishes served after a meal, ranging from cakes
              and pies to ice cream and fruit. They provide a satisfying end to
              a meal and are often enjoyed as a treat or indulgence.
            </p>
          </div>
        </div>
      </div></div>
    
    );
};

export default YourLiking;