import React, { useContext, useState } from 'react'
import logo from "../assets/logoweb.webp"
import { Link, NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineHistory} from 'react-icons/ai';
import UserInfoPopUp from './UserInfoPopUp';
import { BiLogInCircle } from 'react-icons/bi'
import { GiArchiveRegister } from "react-icons/gi";
import { SiWebmoney } from 'react-icons/si';
import { CiFaceSmile } from 'react-icons/ci';
import { GiReceiveMoney } from 'react-icons/gi';
import { GrNotification, GrUserExpert } from "react-icons/gr";
import { AuthContext } from '../helpers/Context';


const SideBar = closeSideBar => {
  const isActiveStyle = 'flex w-full items-center px-5 gap-4 font-bold border-r-2 border-black transaction-all duration-200 ease-in-out hover:shadow-xl py-1'
  const isNotActiveStyle = 'flex items-center px-5 py-1 gap-2 text-gray-500 hover:text-black transaction-all duration-200 ease-in-out capitalize hover:shadow-xl py-1'
  const { authUser, toggleUserInfo, setToggleUserInfo } = useContext(AuthContext)
  
  const categories = [
    { name: "Loan Application", id: "newApplication", icon: SiWebmoney, fontSize: 16}, 
    { name: "Pending Applications", id: "myApplications", icon: CiFaceSmile, fontSize: 20},
    { name: "My Loans", id: "myLoans", icon: GiReceiveMoney, fontSize: 20},
    { name: "Notifications", id: "notification", icon: GrNotification, fontSize:17},
    { name: "User Profile", id: "profile", icon: GrUserExpert, fontSize:17},
    { name: "Other", id: "other", icon: AiFillHome},
  ]

  return (
    <div className='p-3 shadow-lg flex flex-col md:w-60 w-full h-screen justify-between overflow-y-scroll hide-scrollbar'>
      <Link to={'/'}
        className = "flex py-3 md:py-8 w-190 items-center bg-white "
      >
        <img src={logo} alt="Logo" className='w-40 md:w-60'  />
      </Link>
      

      <div className='flex flex-col h-full overflow-auto mt-3 gap-5'>
          <NavLink
            to={'/'}
            className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
            onClick={() => closeSideBar(false)}
          >
            <AiFillHome fontSize={18} className='text-black'/> 
            Home
          </NavLink>
          
          <h4 className='mt-2 px-5 text-base 2xl:text-xl'>For You !</h4>
          <hr />

          {
            authUser.login_status && categories.slice(0, categories.length -1 ).map(category => {
              return ( 
                <NavLink 
                  to={`/category/${category.id}`}
                  className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                  key={category.name}
                  onClick = {() => closeSideBar(false)}
                >
                  <category.icon fontSize={category.fontSize} className='text-black'/>
                  {category.name}
                </NavLink>
              )
            })
          }
      </div>
      
      {
        authUser.login_status ? (
          <div>
            <div className='px-5 shadow-xl py-3 relative text-black md:flex flex-row items-center justify-start gap-2'>
              <img 
                src={authUser.imageUrl} 
                alt="Profile"
                className='w-14 rounded-full cursor-pointer'
                onClick={() => toggleUserInfo ? setToggleUserInfo(false) : setToggleUserInfo(true)}
              />
              {authUser.name}
            </div>

            {toggleUserInfo && (
              <div className='absolute bottom-1 left-24'>
                <UserInfoPopUp />
              </div>
            )}
          </div>
        ) : 
        (
          <div className='hidden md:flex flex-col justify-start p-4 gap-y-3 shadow-2xl border-2 rounded-lg bg-white'>
            <Link to="/register" className='flex flex-row items-center gap-3'>
              <GiArchiveRegister fontSize={18}/>
              Register
            </Link>
            <Link to="/login" className='flex flex-row items-center gap-3'>
              <BiLogInCircle fontSize={21}/>
              Login
            </Link> 
          </div>
        )
      }
      
    </div>
  )
}

export default SideBar
