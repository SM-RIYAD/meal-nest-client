import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";

import Errorpage from "../Components/ErrorPage/Errorpage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/AdminDashboard/UpcomingMeals"
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/DashBoard";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import AddMeal from "../pages/AdminDashboard/AddMeal";
import AllReviews from "../pages/AdminDashboard/AllReviews";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ServeMeal from "../pages/AdminDashboard/ServeMeal";
import Allmeals from "../pages/AdminDashboard/Allmeals";
import UpdateMeal from "../pages/AdminDashboard/UpdateMeal";
import CheckoutPage from "../pages/CheckOutPage/CheckoutPage";
import MealDetails from "../pages/MealDetailspage/MealDetails";
import PrivateRoute from "./PrivateRoute";

import RequestedMeals from "../pages/UserDashBoardPages/RequestedMeals";
import UpcomingMealsforUser from "../pages/UpcomingMeals/UpcomingMealsforUser";
import Myreviews from "../pages/UserDashBoardPages/Myreviews";
import MyProfile from "../pages/UserDashBoardPages/MyProfile"
import AdminRoute from "./AdminRoute";
import PrivateRouteForNonAdmin from "./PrivateRouteForNonAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errorpage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/mealdetails/:id",
        element: <MealDetails />,
        loader: ({ params }) =>
        fetch(`https://meal-nest-server-orpin.vercel.app/specificmeal/${params.id}`)
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/upcomingmeals",
        element: <UpcomingMealsforUser/>,
      },
      {
        path: "updatemeal/:id",
        element: <UpdateMeal />,
        loader: ({ params }) =>
          fetch(`https://meal-nest-server-orpin.vercel.app/specificmeal/${params.id}`),
      },

      {
        path: "checkoutpage/:memberpackage",
        element:  <PrivateRoute><CheckoutPage /></PrivateRoute>  ,
      },

    
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute> ,
    children: [
      // normal user routes

{
  path: "requestedmeals",
  element: <PrivateRouteForNonAdmin><RequestedMeals/></PrivateRouteForNonAdmin> 

}
// ,{
//   path: "",
//   element: <AdminProfile/>

// },
,
{
  path: "userProfile",
  element:  <PrivateRouteForNonAdmin><MyProfile/></PrivateRouteForNonAdmin>

}
,

{
  path: "myreviews",
  element: <PrivateRouteForNonAdmin><Myreviews/></PrivateRouteForNonAdmin> 

}
,

      {
        path: "",
        element:<AdminRoute><AdminProfile /></AdminRoute> ,
      },

      {
        path: "AllReviews",
        element:  <AdminRoute><AllReviews /></AdminRoute>,


      },
      {
        path: "Addmeal",
        element: <AdminRoute> <AddMeal /></AdminRoute>,
      },
      {
        path: "Allmeals",
        element: <AdminRoute><Allmeals /></AdminRoute>,
      },
      {
        path: "manageusers",
        element:  <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "servemeal",
        element:  <AdminRoute><ServeMeal /></AdminRoute>,
      },
      {
        path: "upcomingmeals",
        element: <AdminRoute><UpcomingMeals /></AdminRoute> ,
      },
    ],
  },
]);

export default router;
