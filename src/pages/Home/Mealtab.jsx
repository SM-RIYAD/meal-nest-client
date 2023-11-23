import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MealCard from "./MealCard";
const Mealtab = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setloading] = useState(false);
  const [showmeals, setShowmeals] = useState([]);
useEffect(()=>{  fetch("meals.json")
.then((data) => data.json())
.then((result) => {
  console.log("meals:", result);
  setMeals(result);
  setShowmeals(result);
});},[])

    const handleClickTab = (MealCategory) => {
        const newmeals = meals.filter((meal) => meal.mealType === MealCategory);
        setShowmeals(newmeals)
    
        console.log("this is showmeals array after filter ", showmeals);
      };
    
  return <div className="mx-auto max-w-6xl"> 
    
    
    
    
    
    
    
    <Tabs>
        <TabList className="flex flex-wrap justify-center  text-emerald-500 font-bold">
          <Tab
            onClick={() => {
             setShowmeals(meals);
            }}
          >
            All Meals
          </Tab>
          <Tab
            onClick={() => {
              handleClickTab("Dinner");
            }}
          >
            Dinner
          </Tab>
          <Tab
            onClick={() => {
              handleClickTab("Lunch");
            }}
          >
            Lunch
          </Tab>
          <Tab
            onClick={() => {
              handleClickTab("Breakfast");
            }}
          >
           Breakfast
          </Tab>
          {/* <Tab
            onClick={() => {
              handleClickTab("Hybrid");
            }}
          >
            Hybrid
          </Tab> */}
        </TabList>
        {/* <TabPanel className="border">
          <h2>All Jobs</h2>
        </TabPanel>
        <TabPanel>
          <h2>Part Time</h2>
        </TabPanel>
        <TabPanel>
          <h2>Remote jobs</h2>
        </TabPanel>{" "}
        <TabPanel>
          <h2>onsite jobs </h2>
        </TabPanel>{" "} */}
        {/* <TabPanel>
          <h2>hybrid jobs</h2>
        </TabPanel> */}
      </Tabs>
{loading? <div className="w-full flex justify-center">
            <span className="loading loading-spinner loading-xl"></span>
          </div>:     <div className="grid mt-10  gap-5 grid-cols-3">
        {showmeals.map((meal, idx) => (
          <MealCard meal={meal} key={idx} />
        ))}
      </div>
          
          
          
          }
    
     </div>;
};

export default Mealtab;
