import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );

  const { user, logOut } = useAuth();
  // firebase logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "See you again soon!",
          confirmButtonText: "OK",
          confirmButtonColor: "#6366F1",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar  w-9/10 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-xl">
            Kanban Board
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn bg-gray-600 text-white hover:bg-hoverAccent duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn bg-primary text-white hover:bg-hoverAccent duration-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
