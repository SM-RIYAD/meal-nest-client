import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";

import Errorpage from "../Components/ErrorPage/Errorpage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/DashBoard";






const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement:<Errorpage/>,
 
        children: [
            {
                path: '/',
                element: <Home/>, 
            
            },  
               {
                path: '/login', 
                element: <Login/>, 
                
            },  {
                path: '/register', 
                element: <Register/>, 
                
            },
            {
                path: '/meals', 
                element: <Meals/>, 
                
            },
            {
                path: '/upcomingmeals', 
                element: <UpcomingMeals/>, 
            
                
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
        ]
    }  , {
        path: 'dashboard',
        element: <Dashboard/>,
        children: [
          // normal user routes
        //   {
        //     path: 'userHome',
        //     element: <UserHome></UserHome>
        //   }
        
  
        ]
      }  
]);

export default router;