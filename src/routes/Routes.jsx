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
        fetch(`http://localhost:5000/specificmeal/${params.id}`)
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
          fetch(`http://localhost:5000/specificmeal/${params.id}`),
      },

      {
        path: "checkoutpage/:memberpackage",
        element:  <PrivateRoute><CheckoutPage /></PrivateRoute>  ,
      },

      // {
      //     path: '/blogs',
      //     element: <Blogs/>,

      // },
      // {
      //     path: '/register',
      //     element: <Register/>,

      // },
      // {
      //     path: '/addajob',
      //     element:  <PrivateRoute><Addajob/> </PrivateRoute>,

      // },
      // {
      //     path: '/appliedjobs',
      //     element: <PrivateRoute><AppliedJobs/></PrivateRoute>

      // },
      // {
      //     path: '/jobdetails/:id',
      //     element:  <PrivateRoute><JobDetails/></PrivateRoute>

      // },
      // {
      //     path: '/updatejob/:id',
      //     element: <UpdateJob></UpdateJob>

      // },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // normal user routes

{
  path: "requestedmeals",
  element: <RequestedMeals/>

}

,


      {
        path: "Adminprofile",
        element: <AdminProfile />,
      },
      {
        path: "Addmeal",
        element: <AddMeal />,
      },
      {
        path: "Allmeals",
        element: <Allmeals />,
      },
      {
        path: "manageusers",
        element: <ManageUsers />,
      },
      {
        path: "servemeal",
        element: <ServeMeal />,
      },
      {
        path: "upcomingmeals",
        element: <UpcomingMeals />,
      },
    ],
  },
]);

export default router;
