import React from 'react'
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const isActiveStyle = 'flex items-center md:text-lg px-5 font-bold border-b-2 border-black transaction-all duration-200 ease-in-out hover:shadow-xl py-1'
  const isNotActiveStyle = 'flex items-center md:text-lg  hover:text-gray-400 transaction-all duration-200 ease-in-out capitalize hover:shadow-xl py-1'

  
  return (
   <div class="flex items-center text-black justify-center p-2 m-2 overflow-auto gap-6 shadow-sm">
     <NavLink
      to={"/what"}
      className = {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
    >
      What ?
    </NavLink>

    <NavLink
      to ="/who"
      className = {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
    >
      Who ?
    </NavLink>

    <NavLink
      to={"/rates"}
      className = {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
    >
      Interest Rates
    </NavLink>

    <NavLink
      to={"contact"}
      className = {({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
    >
      Contact Us
    </NavLink>

   </div>
    
  )
}

export default NavBar
