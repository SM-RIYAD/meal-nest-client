import React ,{useState, useEffect} from 'react';
import useMeals from '../../hooks/useMeals';
import SharedBanner from "../../shared/SharedComponents/SharedBanner"
import MealCard from '../Home/MealCard';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import InfiniteScroll from 'react-infinite-scroll-component';
import MealsHorizontalCard from './MealsHorizontalCard';
// import useAxiosPublic from "./useAxiosPublic";

const Meals = () => {
            const axiosPublic= useAxiosPublic();
    const [rangeValue, setRangeValue] = useState(0);
    const [selectedOption, setSelectedOption] = useState("All meals");

      const [searchTerm, setSearchTerm] = useState('');
    // Event handler for range input changes
    const handleRangeChange = (event) => {
      // Update the state with the new value
      setRangeValue(Number(event.target.value));
    };

//    window. location. reload();
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    
        console.log("this is selected now", selectedOption);
      };


      const [showmeals, setShowmeals] = useState([]);
      const {data: meals = [], isPending: loading, refetch} = useQuery({
        queryKey: ['meals'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/meals');

            setShowmeals(res.data);
            return res.data;
        }
    })

    // const [meals, loading, refetch] = useMeals();



    console.log("this is meals", meals);
   
  
   
 const handleSearch=()=>{
  console.log("this is search term",searchTerm);
  const searchRegex = new RegExp(searchTerm, 'i');

  
  const filteredMeals = meals.filter((meal) => searchRegex.test(meal.mealTitle));
  setShowmeals(filteredMeals)

 }

    console.log("this is showmeals", showmeals);
    useEffect(() => {
      let  mealsby_category;
        console.log("this is range value", rangeValue);
        if (rangeValue === 0) {
            // setShowmeals(meals);
            if(selectedOption){

              if(selectedOption==="All meals"){
              
                  mealsby_category= meals;
              }
              else{
  
                  mealsby_category=[...meals].filter(
                      (meal) => meal.mealType.toUpperCase() === selectedOption.toUpperCase()
                    );
  
  
              }
              setShowmeals(mealsby_category);   
            }
            else{
  
              setShowmeals(meals);
            }


        } else {
          let newmeals = meals.filter(
            (meal) =>  rangeValue>=meal?.price

          );
          if(selectedOption){

            if(selectedOption==="All jobs"){
            
                mealsby_category= meals;
            }
            else{

                mealsby_category=newmeals.filter(
                    (meal) => meal.mealType.toUpperCase() === selectedOption.toUpperCase()
                  );


            }
            setShowmeals(mealsby_category);   
          }
          else{

            setShowmeals(newmeals);
          }

        


        }
        // console.log("this is job array after filter ", jobs);
      }, [rangeValue,selectedOption,meals]);

useEffect(() => {
    let p_sorted_meals;
    if (selectedOption === "All meals") {
           
      if(rangeValue){
     
        p_sorted_meals = [...meals].filter(
           (meal) =>  rangeValue>=meal?.price)
           setShowmeals(p_sorted_meals);
   
   } else{
    setShowmeals(meals);

   }
        


        
      } else {
        let newmeals = meals.filter(
          (meal) => meal.mealType.toUpperCase() === selectedOption.toUpperCase()
        );
        if(rangeValue){
     
             p_sorted_meals = newmeals.filter(
                (meal) =>  rangeValue>=meal?.price)
                setShowmeals(p_sorted_meals);
        
        }
        else{
            setShowmeals(newmeals);

        }
     
      }
  



},[rangeValue,selectedOption,meals])








    return (
        <div> 

            
             <SharedBanner title={"Allmeals"}></SharedBanner>
            {/* <p>  this is meal page {meals.length}</p> */}

<div className='mx-auto max-w-6xl'>
<div className="flex lg:flex-row w-full my-5 justify-center p-4 flex-col">
                  <input
                    type="text"
                    placeholder="Search a meal"
                    className="input  mt-5 input-bordered  rounded-none "
                    required

                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                  />
                  <button onClick={handleSearch} className="btn mt-5   rounded-none bg-red-500 border-red-400 border-4  text-white hover:border-none  ">
                    Search
                  </button>
                </div>
<div className='flex lg:flex-row flex-col p-4 space-y-5 justify-between'>
<div>
<input
        type="range"
        id="rangeInput"
        min={0}
        max={40} // Set max as a number, not a string
        step={10}
        value={rangeValue}
        onChange={handleRangeChange}
        className='range'
      />
<div className="w-full flex justify-between text-xs px-2">
  <span></span>
  <span>10</span>
  <span>20</span>
  <span>30</span>
  <span>40</span>

</div>

</div>







<select
            value={selectedOption}
            onChange={handleSelectChange}
            className="select md:ms-5 md:max-w-[300px] lg:max-w-[300px]  select-bordered w-full  lg:ms-2"
          >
            <option value="All meals">Select a Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            
          </select>

</div>



{loading ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
       

<InfiniteScroll   className=''
  dataLength={showmeals?.length} //This is important field to render the next data
  next={refetch}
  // hasMore={true}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      {/* <b>Yay! You have seen it all</b> */}
    </p>
  }
  // below props only if you need pull down functionality

>
  
   <div className="grid mt-10 gap-5 p-5  lg:p-0  grid-cols-1 lg:grid-cols-2">
          {showmeals.map((meal) => (
           
            <MealsHorizontalCard meal={meal} key={meal._id} />
          ))}
</div>
</InfiniteScroll>
        
      )}
</div>
           




        </div>
    );
};

export default Meals;