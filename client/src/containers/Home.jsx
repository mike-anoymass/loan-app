import React, { useContext, useEffect, useState } from 'react'
import { SideBar, UserInfoPopUp, NavBar, UserProfile, LoanApplication} from '../components'
import logo from "../assets/logoweb.webp"
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";
import { AuthContext } from '../helpers/Context';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import About from './About';
import axios from 'axios';

const Home = () => {
  const { authUser , toggleUserInfo, setToggleUserInfo } = useContext(AuthContext)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/basicInfo/checkProfile/profile", {
      headers: {
        loginToken: localStorage.getItem("loginToken")
      }
    }).then(res => {
      if(!res.data){
        navigate("/createProfile")
      }
    }).catch(err => console.log("verification_error", err))
  }, [])

  const imgClicked = () => {
    if(toggleUserInfo){
      setToggleUserInfo(false)
    }else{
      setToggleUserInfo(true)
    }
  }

  return (
    <div className='flex md:flex-row flex-col w-full h-full'>

      {/*on desktop show the side nav*/}
      <div className="md:flex hidden w-60">
        <SideBar />
      </div>

      {/*mobile navbar */}
      <div className='md:hidden w-full flex flex-row p-3'>
        <div className='flex relative p-2 my-1 justify-between items-center shadow-md bg-white w-full'>
          <div className='p-2'>
            <AiOutlineMenu
              fontSize={24}
              className = "cursor-pointer"
              onClick={ () => setToggleSidebar(true) }
            />
          </div>
          <div className='p-2'>
            <img src={logo} alt="LOGO" className='w-36' />
          </div>
          <div className='p-2'>
            {
              authUser.login_status ? (
                <img 
                  src={authUser.imageUrl} alt="PROFILE"
                  className='w-14 rounded-full cursor-pointer'
                  onClick={imgClicked}
                />
              ): (
                <div className='flex justify-center items-center'>
                  <Link to="/login" className='p-3'>Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              )
            }
           
          </div>
          {
            toggleUserInfo && (
              <div className='absolute top-24 right-0  '>
                <UserInfoPopUp />
              </div>
            )
          }
        </div>
      </div>

      {/* when menu icon is clicked on mobile */}
      {
        toggleSidebar && (
          <div className='fixed w-4/5 h-full bg-white shadow-5xl md:hidden z-10 transition duration-200 animate-slide-in'>
            <div className='flex flex-row justify-end p-2'>
              <AiFillCloseCircle
                fontSize={24}
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar closeSideBar = {setToggleSidebar}/>
          </div>
        )
      }


      {/* Horizontal navigation  */}
      <div className='w-full h-full'>
        <div>
          <NavBar />
        </div>

        <div className='p-5 h-full'>
          <Routes>
            <Route path='/who' element={<About/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
            <Route path='/category/newApplication' element={<LoanApplication/>}/>
          </Routes>
        </div>
      </div>

      
      
    </div>
  )
}

export default Home
