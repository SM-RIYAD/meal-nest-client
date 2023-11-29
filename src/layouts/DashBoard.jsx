import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    // const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    // const isAdmin=false;
 console.log("is admin or not",isAdmin)
    return (
        <div className="flex mx-auto max-w-6xl">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-red-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <Link to="/dashboard/adminprofile">
                                    <FaHome></FaHome>
                                    Admin Profile</Link>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageusers">
                                    <FaUtensils></FaUtensils>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addmeal">
                                    <FaList></FaList>
                                    Add Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allmeals">
                                    <FaBook></FaBook>
                                    All Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/AllReviews">
                                    <FaUsers></FaUsers>
                                    All Reviews </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/servemeal">
                                    <FaUsers></FaUsers>
                                    Serve Meals </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcomingmeals">
                                    <FaUsers></FaUsers>
                                    Upcoming Meals </NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userProfile">
                                        <FaHome></FaHome>
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestedmeals">
                                        <FaCalendar></FaCalendar>
                                        Requested Meals</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/dashboard/myreviews">
                                        <FaAd></FaAd>
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
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
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