import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";



const Dashboard = () => {
    // const [cart] = useCart();
    const navigate = useNavigate();
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const {logOut}=useAuth();
    const handleLogout = () => {
        logOut()
          .then((result) => {
            console.log(result.user);
            navigate('/');
          })
          .catch((err) => console.log(err));
      };
    
    // const isAdmin=false;
 console.log("is admin or not",isAdmin)
    return (
        <div className="flex  mx-auto max-w-6xl">
            {/* dashboard side bar */}
            <div className="lg:w-64 min-h-screen   bg-red-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <Link to="/dashboard">
                              
                                    Admin Profile</Link>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageusers">
                            
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addmeal">
                                
                                    Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allmeals">
                                 
                                    All Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/AllReviews">
                                 
                                    All Reviews </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/servemeal">
                               
                                    Serve Meals </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcomingmeals">
                                 
                                    Upcoming Meals </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userProfile">
                             
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestedmeals">
                              
                                        Requested Meals</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/dashboard/myreviews">
                                     
                                        My Reviews</NavLink>
                                </li>
                             
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/meals">
                    
                            Meal Display</NavLink>
                    </li>
                    <li>
                    <btn
                  onClick={handleLogout}
                  className={`border-0 text-start btn btn-sm btn-error `}
                >
                  Logout
                </btn>
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