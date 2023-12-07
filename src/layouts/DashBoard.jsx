import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { PiBowlFood } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";
import "./Root.css"
const Dashboard = () => {
  // const [cart] = useCart();
  const navigate = useNavigate();
  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();
  const { logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // const isAdmin=false;
  console.log("is admin or not", isAdmin);
  return (
    <div className="flex font-class  mx-auto max-w-6xl">
      {/* dashboard side bar */}
      <div className="lg:w-64 min-h-screen bg-gradient-to-r from-gray-600 to-red-500  ">
        <ul className="menu space-y-2 p-4 text-white">
          {isAdmin ? (
            <>
              <li>
                <Link to="/dashboard">
                  <MdAdminPanelSettings />
                  Admin Profile
                </Link>
              </li>
              <li>
                <NavLink to="/dashboard/manageusers">
                  <MdManageHistory />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addmeal">
                  <IoMdAddCircle />
                  Add Meal
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allmeals">
                  <PiBowlFood />
                  All Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/AllReviews">
                  <MdOutlineReviews />
                  All Reviews{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/servemeal">
                  <PiBowlFood /> Serve Meals{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/upcomingmeals">
                  <PiBowlFood /> Upcoming Meals{" "}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userProfile">
                <CgProfile />
                    
                    My Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedmeals">
                <PiBowlFood />     Requested Meals
                </NavLink>
              </li>
              {/* <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li> */}
              <li>
                <NavLink to="/dashboard/myreviews">
            
                    <MdOutlineReviews /><p>My Reviews </p> 
              
                </NavLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/meals">
              <PiBowlFood /> Meal Display
            </NavLink>
          </li>
          <li>
            {/* <btn
              onClick={handleLogout}
              className={`border-0 text-start btn btn-sm btn-error `}
            ><CiLogout />
              
            </btn> */}
          <p  onClick={handleLogout} ><CiLogout /> Logout
             </p>  
          </li>

          <li>
          <img
                className="lg:w-[250px] w-[300px]  "
                src={` ${"https://i.ibb.co/vZmgLmZ/mealnestlogo-removebg-preview-1.png"}`}
              />
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
