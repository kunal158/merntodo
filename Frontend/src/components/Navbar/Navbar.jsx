import React from "react";
import { RiContactsBook2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    history("/");
  };
  return (
    <div>
      <header className="mb-2 px-4 shadow">
        <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="flex items-center text-2xl font-black">
            <span className="mr-2 text-3xl text-blue-600">
              <RiContactsBook2Fill />
            </span>
            <span>Todo List</span>
          </NavLink>

          <input
            className="peer hidden"
            type="checkbox"
            id="navbar-open"
          />
          <label
            className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0"
          >
            <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
              <li>
              <NavLink
                  to="/"
                  className="text-gray-600 hover:text-blue-600"
              >
                Home
              </NavLink>
              
              </li>
              
              {isLoggedIn && (
                <>
              <li>
              <NavLink
                  to="/todo"
                  className="text-gray-600 hover:text-blue-600"
              >
                Todo
              </NavLink>
              </li>
              </>
              )}


              {!isLoggedIn && (
                <>
                <li className="mt-2 sm:mt-0">
                  <NavLink
                    to="/signin"
                    className="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Signin
                  </NavLink>
                </li>
                <li className="mt-2 sm:mt-0">
                  <NavLink
                    to="/signup"
                    className="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Signup
                  </NavLink>
                </li>
                </>
              )}
              {isLoggedIn && (
                <li className="mt-2 sm:mt-0" onClick={logout}>
                  <NavLink
                    to="/"
                    className="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
