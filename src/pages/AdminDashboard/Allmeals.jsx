import React from "react";
import useMeals from "../../hooks/useMeals";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Allmeals = () => {
  const [meals, loading, refetch] = useMeals();
  const [showmeals, setShowmeals] = useState(meals);
  () => {
    setShowmeals(meals);
  },
    [meals];
  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Meal Title</th>
                  <th>Likes Count</th>
                  <th>Reviews Count </th>
                  <th>Distributor Name</th>
                  <th>Distributor Emai</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {showmeals.map((meal) => (
                  <tr key={meal._id}>
                    <th>{meal.mealTitle}</th>
                    <td>{meal.likes}</td>
                    <td>{meal.reviews}</td>
                    <td>{meal.adminName}</td>
                    <td>{meal.adminEmail}</td>
                    <td>
                        <Link to={`/updatemeal/${meal._id}`}>    <button className="btn btn-xs ms-1 btn-error text-white">
                         {" "}
                         Update{" "}
                       </button>
                            </Link>
                  
                      <button className="btn ms-1 btn-xs btn-error text-white">
                        {" "}
                        Delete{" "}
                      </button>
                      <button className="btn btn-xs btn-error ms-1 text-white">
                        {" "}
                        view{" "}
                      </button>
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Littel, Schaden and Vandervort</td>
                  <td>Canada</td>
                  <td>
                    <button className="btn btn-xs ms-1 btn-error text-white">
                      {" "}
                      Update{" "}
                    </button>
                    <button className="btn ms-1 btn-xs btn-error text-white">
                      {" "}
                      Delete{" "}
                    </button>
                    <button className="btn btn-xs btn-error ms-1 text-white">
                      {" "}
                      view{" "}
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allmeals;
