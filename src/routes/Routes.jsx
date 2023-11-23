import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";

import Errorpage from "../Components/ErrorPage/Errorpage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";






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
    }    
]);

export default router;