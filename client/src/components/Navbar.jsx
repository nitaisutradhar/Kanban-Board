import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "See you again soon!",
          confirmButtonText: "OK",
          confirmButtonColor: "#4F46E5", // indigo-600
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

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "text-base-content hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-cyan-50 shadow-md">
      <div className="navbar max-w-7xl mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition">
            KanbanBoard
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-sm btn-outline btn-error hover:scale-105 duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary hover:scale-105 duration-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
