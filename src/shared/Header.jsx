import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import "./Header.css";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";
const Header = () => {
  const [isAdmin] = useAdmin();
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
  const handleAdminCredentials = () => {
    Swal.fire({
      icon: "warning",
      title: "Admin Credentials",
      html: `
      <div >
    <p>Admin Email: syed@gmail.com </p> <p className='pt-5'>Admin Password: syeD123#</p>

      </div>
    `, showConfirmButton: false,
      showCloseButton: true,
      footer: "Log in as admin to explore admin dashboard",
    });
    // Swal.fire({
    //   title: "<strong>Admin Credentials</strong>",
    //   icon: "info",
    //   html: `

    //     <div >
    //   <p>Admin Email: syed@gmail.com </p> <p>   Admin Password: syeD123#</p>
    // <footer>Log in as admin to explore admin dashboard</footer>
    //     </div>,

    //   `,
    //   showCloseButton: true,
    //   showCancelButton: true,
    //   focusConfirm: false,
    //   confirmButtonText: `
    //     <i class="fa fa-thumbs-up"></i> Great!
    //   `,
    //   confirmButtonAriaLabel: "Thumbs up, great!",
    //   cancelButtonText: `
    //     <i class="fa fa-thumbs-down"></i>
    //   `,
    //   cancelButtonAriaLabel: "Thumbs down"
    // });
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
      <li className={`${user ? "pt-5" : "pt-5"} `}>
        <button className="admin-text" onClick={handleAdminCredentials}> Admin</button>
      </li>
    </>
  );

  const endlinks = (
    <>
      <li>
        {user ? (
          <details>
            <summary>
              <div className="w-12 rounded-full  tooltip">
                <img className="rounded-full" src={user?.photoURL} />
              </div>
            </summary>
            <ul className="p-2 bg-white ">
              <li>
                <a>{user?.displayName}</a>
              </li>
              <li className="hover:text-white">
                <Link
                  to={`${
                    isAdmin === true ? "/dashboard" : "/dashboard/userProfile"
                  }`}
                >
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <btn
                  onClick={handleLogout}
                  className={`border-0  btn btn-error btn-outline`}
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
        )}
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
              className="menu  z-40 menu-sm dropdown-content mt-3  p-2 shadow bg-black rounded-box w-52"
            >
              {navLinks}
              {endlinks}
            </ul>
          </div>

          <div className="lg:w-1/2 object-cover   w-full h-full">
            <img
              className="lg:flex hidden object-cover"
              src="https://i.ibb.co/vZmgLmZ/mealnestlogo-removebg-preview-1.png"
              alt=""
            />

            <p className="lg:hidden flex text-xl text-red-400 font-bold">
              MEAL NEST
            </p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{endlinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
