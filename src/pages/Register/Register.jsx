import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../providers/AuthProvider";
import PageTitle from "../../Components/PageTitle";
import RegisterBanner from "./RegisterBanner";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const axiosPublic= useAxiosPublic();
  //   const { createUser, updateUser,logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, logOut, googleSignIn } =
    useContext(AuthContext);
  const errorToast = (regError) =>
    toast.error(regError, { position: "bottom-center" });

  const SuccessToast = (successmsg) =>
    toast.success(successmsg, { position: "bottom-center" });

  const [regError, SetRegError] = useState("");
  const handleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        console.log("this is logged in user", result.user);

        SuccessToast("Successfully logged in !");
        console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            badge:'bronze',
            role:'admin'
        }
        axiosPublic.post('/users', userInfo)
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
        console.error("this is ", error);

        errorToast(error.message);
      });
  };
  const handleRegister = (data) => {
    // e.preventDefault();
    const name = data.name;
    console.log("data in reg ", data);
    const password = data.password;
    const photo = data.photoURL;
    const email = data.email;

    if (password.length < 6) {
      errorToast("Password should be of at least 6 digits");
      return;
    } else if (!/[A-Z]/.test(password)) {
      errorToast("Password should have at least one capital letter");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errorToast("Password should have at least one special character");
      return;
    } else {
      createUser(email, password)
        .then((result) => {
          console.log(result.user);
          console.log("user created");
          updateUser(name, photo)
            .then((result) => {
              console.log("profile updated", result);
              SuccessToast("user Created!");
              
              logOut();




              reset();

              const userInfo = {
                email: email,
                name: name,
                badge:'bronze',
                role:'normal'
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                // navigate('/');
            })
    









              // ...
            })
            .catch((error) => {
              // An error occurred
              console.log("error in update", error.message);
              errorToast(error.message);
              // ...
            });
        })
        .catch((error) => {
          console.error("THIS IS ERROR IN REG ", error);
        });
    }
  };
  return (
    <div>
      <PageTitle title={"Register"}></PageTitle>
      <ToastContainer />
      <RegisterBanner></RegisterBanner>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left h-full w-full lg:block hidden  ">
            <img
              className="h-full object-cover"
              src="https://i.ibb.co/DpXydjr/vecteezy-cloud-computing-modern-flat-concept-for-web-banner-design-5879539-removebg-preview-3.png"
              alt=""
            />
          </div>
          <div className="border-2 border-white  card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {/* <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                /> */}
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                {/* <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  required
                /> */}{" "}
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                {/* <input
                  type="photo"
                  name="photo"
                  placeholder="enter photo url"
                  className="input input-bordered"
                  required
                /> */}
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
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
                  required
                /> */}{" "}
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="flex mt-2 justify-start">
                  {" "}
                  <p>
                    Have an account?
                    <span className="text-emerald-500 font-bold underline">
                      <Link to={"/login"}>Log in </Link>
                    </span>
                  </p>
                </label>
              </div>
              <div className="form-controls mt-6">
                <button className="btn bg-emerald-500 btn-primary border-0 text-white">
                  Register
                </button>
              </div>
            </form>
            <div className="flex justify-center w-full">
              <button
                onClick={handleGoogleSignin}
                className=" lg:w-[320px] w-[220px] btn mt-1 mb-5  bg-emerald-500 btn-primary border-0 text-white"
              >
                Continue With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
