import { useState, useContext } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../providers/AuthProvider";
import PageTitle from "../../Components/PageTitle";
import LoginBanner from "./LoginBanner";
import { useForm } from "react-hook-form";
import SharedBanner from "../../shared/SharedComponents/SharedBanner";
import axios from "axios";
// import AuthProvider, { AuthContext } from "../../providers/AuthProvider";
// import Header from "../Home/Header/Header";
const Login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const errorToast = (loginError) =>
    toast.error(loginError, { position: "bottom-center" });

  const SuccessToast = (successmsg) =>
    toast.success(successmsg, { position: "bottom-center" });
//   const { signIn,googleSignIn } = useContext(AuthContext);

const { signIn,googleSignIn,theme }=useContext(AuthContext);

  const handleLogin = (data) => {
    // e.preventDefault();

    const password = data.password;

    const email = data.email;
    if(email.length===0 || password.length===0){

     
      errorToast("Fields cannot be empty!");
      return;

    }

    signIn(email, password)
      .then((result) => {
        console.log(result.user);

      
        SuccessToast("Successfully logged in !");
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        console.error("this is ", error);

        errorToast(error.message);
      });
  };

//   const handleGoogleSignin=()=>{

//     googleSignIn() .then((result) => {
//       console.log("this is logged in user",result.user);

      
//       SuccessToast("Successfully logged in !");

      
//       // <Navigate state={location.pathname} to={location?.state ? location.state : '/'}></Navigate>
// navigate(location?.state ? location.state : '/', { state: { from: location.pathname } });
//     })
//     .catch((error) => {
//       console.error("this is ", error);

//       errorToast(error.message);
//     });

//   }


  const handleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        console.log("this is logged in user", result.user);

        SuccessToast("Successfully logged in !");
        console.log("this is in login google",result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            badge:'bronze',
            role:'normal'
        }
        console.log("this is user info in login",userInfo);
        axios.post('https://meal-nest-server-orpin.vercel.app/users', userInfo)
        .then(res =>{
            console.log(res.data);
            // navigate('/');
        })

        // <Navigate state={location.pathname} to={location?.state ? location.state : '/'}></Navigate>
        navigate(location?.state ? location.state : "/", {
          state: { from: location.pathname },
        });
      })
      .catch((error) => {
        console.error("this is error in login ", error);

        errorToast(error.message);
      });
  };
  return (
    <div  className="">
   <PageTitle title={"Login"}></PageTitle>
      <ToastContainer />
                   <SharedBanner title={"LOG IN"}></SharedBanner>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:block hidden lg:text-left h-full w-full  ">
            <img
              className="h-full object-cover"
              src="https://i.ibb.co/DpXydjr/vecteezy-cloud-computing-modern-flat-concept-for-web-banner-design-5879539-removebg-preview-3.png"
              alt=""
            />
          </div>
          <div className=" border-2 border-white card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {/* <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
             
                /> */}  <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                    <input
                  type="text"
                  name="test"
                  placeholder="test"
                  className="input hidden input-bordered"
             
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {/* <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  
                /> */}     <input
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="flex justify-start mt-2">
                  {" "}
                  <p>
                    New to the web site?
                    <span className="text-red-500 font-bold underline">
                      <Link to={"/register"}>Register </Link>
                    </span>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-red-500 btn-primary border-0 text-white">
                  Login
                </button>
               
              </div>
              {/* <button onClick={handleGoogleSignin} className=" btn mt-5 bg-red-600 btn-primary border-0 text-white">
                  Log In With Google
                </button> */}
            </form> 
            <div className="flex justify-center w-full">
            <button onClick={handleGoogleSignin} className=" lg:w-[320px] w-[220px] btn mt-1 mb-5  bg-red-500 btn-primary border-0 text-white">
                  Log In With Google
                </button>

            </div>
           
      
            
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
