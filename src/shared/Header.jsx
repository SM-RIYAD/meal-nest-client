import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import "./Header.css";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const { pathname } = useLocation();
  console.log("this is from header", pathname);
  const navigate = useNavigate();
  console.log("photo url", user?.photoURL);
  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result.user);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li className={`${user ? "pt-5" : "pt-5"} `}>
        <Link className={`${pathname === "/" ? "active-link" : ""}`} to="/">
          HOME
        </Link>
      </li>

      <li className={`${user ? "pt-5" : "pt-5"} `}>
        <Link
          className={`${pathname === "/meals" ? "active-link" : ""}`}
          style={{ style: "" }}
          to="/meals"
        >
          Meals
        </Link>
      </li>

      <li className={`${user ? "pt-5" : "pt-5"} `}>
        <Link
          className={`${pathname === "/upcomingmeals" ? "active-link" : ""}`}
          to="/upcomingmeals"
        >
          Upcoming Meals
        </Link>
      </li>
      {user?.displayName && (
        <li className={`${user ? "pt-5" : "pt-5"} `}>
          <Link
            className={`${pathname === "/myjobs" ? "active-link" : ""}`}
            to="/myjobs"
          >
            MY JOBS
          </Link>
        </li>
      )}
      {user?.displayName && (
        <li className={`${user ? "pt-5" : "pt-5"} `}>
          <Link
            className={`${pathname === "/addajob" ? "active-link" : ""}`}
            to="/addajob"
          >
            ADD JOB
          </Link>
        </li>
      )}
      {user?.displayName && (
        <li className={`${user ? "pt-5" : "pt-5"} `}>
          <Link
            className={`${pathname === "/appliedjobs" ? "active-link" : ""}`}
            to="/appliedjobs"
          >
            APPLIED JOBS
          </Link>
        </li>
      )}

      {/* <li className={`${user ? "pt-10" : "pt-5"} `}>
        {user?.displayName ? (
          <p onClick={handleLogout} className="border-0">
            Logout
          </p>
        ) : (
          <Link
            className={`${pathname === "/login" ? "active-link" : ""}`}
            to="/login"
          >
            <p className="border-0">Log in</p>
          </Link>
        )}
      </li> */}
    </>
  );

  const endlinks = (
    <>
      <li>
        {
          user ? (
            // <div className="  lg:ms-0 uppercase  flex items-center flex-col mt-6 gap-2  ">
            //   <div className="rounded-full  tooltip flex gap-5">
            //     <div
            //       className="w-12 rounded-full  tooltip"
            //       data-tip={user?.displayName}
            //     >
            //       <img className="rounded-full" src={user?.photoURL} />
            //     </div>
            //     <btn
            //       onClick={handleLogout}
            //       className={`border-0 ${
            //         pathname === "/" ? "" : "hidden"
            //       }  btn btn-error btn-outline`}
            //     >
            //       Logout
            //     </btn>
            //   </div>
            //   {/* <p className="font-bold  ">{user.displayName}</p> */}
            // </div>
            <details>
              <summary>

                   <div
                  className="w-12 rounded-full  tooltip"
               
                >
                  <img className="rounded-full" src={user?.photoURL} />
                </div>

                
              </summary>
              <ul className="p-2 bg-opacity-70">
                <li>
                  <a>{user?.displayName}</a>
                </li>
                <li>
                  <Link to={"/dashboard"}> 
                  <a>Dashboard</a>
                  </Link>
                
                </li>
                <li>
                    <btn
                  onClick={handleLogout}
                  className={`border-0 ${
                    pathname === "/" ? "" : "hidden"
                  }  btn btn-error btn-outline`}
                >
                  Logout
                </btn>
                </li>
              </ul>
            </details>
          ) : (
            <Link
              className={`${pathname === "/login" ? "active-link" : ""}`}
              to="/login"
            >
              <p className="border-0  font-bold">Log in</p>
            </Link>
          )
          // <div>JoinUS</div>
        }
      </li>
    </>
  );
  return (
    <div className="   ">
      <div className="navbar text-red-400 font-bold absolute z-50 bg-opacity-30 bg-black   px-20   ">
        <div className="navbar-start ">
          <div className="dropdown ">
            <label tabIndex={0} className="btn btn-ghost z-50  lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu  z-40 menu-sm dropdown-content mt-3  p-2 shadow bg-base-200 rounded-box w-52"
            >
              {navLinks}
              {endlinks}
            </ul>
          </div>
          <a className=" text-2xl     ">
            {/* <div className=" lg:w-2/3 w-[200px] ">
              <img
                className=" "
                src={` ${"https://i.ibb.co/sJcZxsz/jobspherenew-removebg-preview.png"}`}
              />
            </div> */}
            Meal Nest
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* <ul className="menu menu-horizontal px-1">{navLinks}</ul> */}
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{endlinks}</ul>
          {/* {user?.displayName ? (
            <button
              onClick={handleLogout}
              className="btn btn-primary bg-red-400 border-0 text-white"
            >
              {" "}
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="btn border-0  bg-red-400 text-white">
                {" "}
                Log in
              </button>{" "}
            </Link>
          )} */}
          {/* {theme === "light" && (
            <button
              onClick={() => {setTheme("dark");
              console.log("this is theme ",theme)
            
            }}
              className="btn btn-primary ms-5  border-0 text-white"
            >
              {" "}
              Dark
            </button>
          )}

          {theme === "dark" && (
            <button
              onClick={() => {setTheme("light")
            
            
            console.log("this is theme ",theme)}}
              className="btn btn-primary ms-5 border-0 text-white"
            >
              {" "}
              Light
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
