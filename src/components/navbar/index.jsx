import { MdFilterList, MdOutlineFilterListOff } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import getAuthToken from "../auth/getAuthToken";

const NavBar = () => {
  const [navIsShown, setNavIsShown] = useState(false);

  const navigate = useNavigate();
  const token = getAuthToken();

  function logoutHandler() {
    localStorage.clear();
    navigate("/");
  }

  function toggleNav() {
    setNavIsShown(!navIsShown);
  }

  return (
    <div className="">
      <nav className="flex justify-between max-w-[1200px] font-bold items-center p-[12px] mx-auto ">
        <h1 className=" text-cwhite text-1xl">
          <Link to="/" className="flex gap-1">
            <span>Expense </span>
            <p className="text-ctextcolor"> Tracker</p>
          </Link>
        </h1>
        <ul className={` text-md font-sans hidden md:flex`}>
          <li className="md:text-base  p-2 font-medium ">
            <Link to="/" className="">
              Home
            </Link>
          </li>
          <li className="md:text-base  p-2 font-medium  ">
            {!token ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
          </li>
          <li className="md:text-base  p-2 font-medium  ">
            {token ? <button onClick={logoutHandler}>Logout</button> : null}
          </li>
        </ul>
        <div className="block md:hidden">
          {!navIsShown ? (
            <MdFilterList onClick={toggleNav} size={25} className="text-cwhite"/>
          ) : (
            <MdOutlineFilterListOff onClick={toggleNav} size={25} className="text-cwhite" />
          )}
        </div>
      </nav>
      <div>
        <ul
          className={` ${
            navIsShown
              ? "fixed left-0 text-md font-sans bg-cblack  w-1/2 h-full transition-all ease-in-out duration-300 z-50 text-cwhite"
              : "fixed left-[-100%] ease-in-out duration-300 w-1/2 h-full"
          }`}
          onClick={toggleNav}
        >
          <li className=" md:text-base  p-2 font-medium border-b border-gray-700">
            <Link to="/" className="">
              Home
            </Link>
          </li>
          <li className="md:text-base  p-2 font-medium  border-b border-gray-700">
            {!token ? (
              <Link to="/login" className="">
                Login
              </Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
          </li>
          <li className="md:text-base  p-2 font-medium  ">
            {token ? <button onClick={logoutHandler}>Logout</button> : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
